import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

type Db = Database.Database;

let db: Db | null = null;

function ensureColumn(database: Db, table: string, column: string, definition: string) {
  const rows = database.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
  const exists = rows.some((r) => r.name === column);
  if (!exists) {
    database.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
}

function initDb(database: Db) {
  database.pragma('journal_mode = WAL');
  database.pragma('foreign_keys = ON');

  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      verified INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS referral_codes (
      code TEXT PRIMARY KEY,
      referrer_id TEXT NOT NULL,
      active INTEGER NOT NULL DEFAULT 1,
      expires_at INTEGER,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (referrer_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS referrals (
      referrer_id TEXT NOT NULL,
      referred_id TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      PRIMARY KEY (referrer_id, referred_id),
      FOREIGN KEY (referrer_id) REFERENCES users(id),
      FOREIGN KEY (referred_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS points_adjustments (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      delta INTEGER NOT NULL,
      action TEXT,
      reason TEXT,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS rate_limits (
      key TEXT PRIMARY KEY,
      count INTEGER NOT NULL,
      reset_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS premium_waitlist (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      email_hash TEXT NOT NULL UNIQUE,
      name TEXT,
      position INTEGER NOT NULL UNIQUE,
      interested_date INTEGER,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS push_subscriptions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      endpoint TEXT NOT NULL UNIQUE,
      auth_key TEXT,
      p256dh_key TEXT,
      subscription_data TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS notification_preferences (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
      preferences_data TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS email_jobs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      email TEXT NOT NULL,
      template TEXT NOT NULL,
      send_at INTEGER NOT NULL,
      sent_at INTEGER,
      meta TEXT,
      created_at INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE INDEX IF NOT EXISTS idx_email_jobs_send_at ON email_jobs(send_at);
    CREATE INDEX IF NOT EXISTS idx_email_jobs_status ON email_jobs(status);

    CREATE UNIQUE INDEX IF NOT EXISTS idx_referrals_referred_id ON referrals(referred_id);
    CREATE INDEX IF NOT EXISTS idx_referral_codes_referrer_id ON referral_codes(referrer_id);
    CREATE INDEX IF NOT EXISTS idx_spot_reservations_expires_at ON spot_reservations(expires_at);
  `);

  ensureColumn(database, 'users', 'email_hash', 'TEXT');
  ensureColumn(database, 'users', 'email_enc', 'TEXT');
  ensureColumn(database, 'users', 'name_enc', 'TEXT');
  ensureColumn(database, 'users', 'points', 'INTEGER NOT NULL DEFAULT 0');
  ensureColumn(database, 'referrals', 'rewarded_at', 'INTEGER');
  ensureColumn(database, 'points_adjustments', 'action', 'TEXT');

  // Seed the spot config row exactly once
  const configRow = database
    .prepare('SELECT id FROM premium_spot_config WHERE id = 1')
    .get();
  if (!configRow) {
    const now = Date.now();
    // Price increases 30 days from first boot
    database
      .prepare(
        'INSERT INTO premium_spot_config (id, total_spots, spots_taken, price_increase_at, updated_at) VALUES (1, 500, 0, ?, ?)'
      )
      .run(now + 30 * 24 * 60 * 60 * 1000, now);
  }

  database.exec(`
    CREATE TABLE IF NOT EXISTS email_verification_tokens (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token TEXT NOT NULL UNIQUE,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS share_tracking (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      referral_code TEXT,
      share_channel TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_hash ON users(email_hash) WHERE email_hash IS NOT NULL;
    CREATE INDEX IF NOT EXISTS idx_rate_limits_reset_at ON rate_limits(reset_at);
    CREATE INDEX IF NOT EXISTS idx_referrals_rewarded_at ON referrals(rewarded_at);
    CREATE INDEX IF NOT EXISTS idx_points_adjustments_user_id ON points_adjustments(user_id);
    CREATE INDEX IF NOT EXISTS idx_email_verification_tokens_user_id ON email_verification_tokens(user_id);
    CREATE INDEX IF NOT EXISTS idx_email_verification_tokens_expires_at ON email_verification_tokens(expires_at);
    CREATE INDEX IF NOT EXISTS idx_share_tracking_user_id ON share_tracking(user_id);
    CREATE INDEX IF NOT EXISTS idx_share_tracking_created_at ON share_tracking(created_at);

    CREATE TABLE IF NOT EXISTS unsubscribed_emails (
      email TEXT PRIMARY KEY,
      reason TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_unsubscribed_emails_created_at ON unsubscribed_emails(created_at);

    CREATE TABLE IF NOT EXISTS email_preferences (
      email TEXT PRIMARY KEY,
      preferences_data TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_email_preferences_updated_at ON email_preferences(updated_at);

    CREATE TABLE IF NOT EXISTS magic_links (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token TEXT NOT NULL UNIQUE,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL,
      used_at INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE INDEX IF NOT EXISTS idx_magic_links_expires_at ON magic_links(expires_at);
    CREATE INDEX IF NOT EXISTS idx_magic_links_user_id ON magic_links(user_id);
  `);
}

export function getDb(): Db {
  if (db) return db;

  const explicitPath = process.env.SWAPTRADE_SQLITE_PATH;
  const dbPath = explicitPath
    ? explicitPath === ':memory:'
      ? ':memory:'
      : path.resolve(explicitPath)
    : (() => {
        const dataDir = process.env.SWAPTRADE_DATA_DIR
          ? path.resolve(process.env.SWAPTRADE_DATA_DIR)
          : path.join(process.cwd(), '.data');
        fs.mkdirSync(dataDir, { recursive: true });
        return path.join(dataDir, 'swaptrade.sqlite');
      })();

  const instance = new Database(dbPath);
  initDb(instance);

  db = instance;
  return instance;
}

export function resetDbForTests() {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('resetDbForTests is only available in test environment');
  }

  if (db) {
    db.close();
    db = null;
  }
}
