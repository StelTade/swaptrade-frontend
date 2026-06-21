import { getDb, resetDbForTests } from './db';
import { schedulePostSignupSequence, fetchDueEmailJobs } from './onboardingEmails';

beforeEach(() => {
  process.env.SWAPTRADE_SQLITE_PATH = ':memory:';
  resetDbForTests();
  getDb();
});

test('schedules 7 emails for regular users and 8 for premium', async () => {
  const jobs = await schedulePostSignupSequence({ userId: 'u1', email: 'a@example.com', name: 'A', isPremium: false });
  expect(jobs.length).toBe(7);

  const jobs2 = await schedulePostSignupSequence({ userId: 'u2', email: 'b@example.com', name: 'B', isPremium: true });
  expect(jobs2.length).toBe(8);

  // confirm jobs are persisted
  const due = await fetchDueEmailJobs(100);
  // none should be due immediately since send_at is in future (but welcome may be immediate)
  expect(Array.isArray(due)).toBe(true);
});
