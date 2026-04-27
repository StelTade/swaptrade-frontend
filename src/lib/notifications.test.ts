import {
  isNotificationSupported,
  isPushSupported,
  getNotificationPermission,
  getNotificationPreferences,
  setNotificationPreferences,
} from '@/lib/notifications';
import type { NotificationPreferences } from '@/lib/notifications';

describe('Notifications Service', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Support Detection', () => {
    it('should detect notification support', () => {
      const supported = isNotificationSupported();
      expect(typeof supported).toBe('boolean');
    });

    it('should detect push support', () => {
      const supported = isPushSupported();
      expect(typeof supported).toBe('boolean');
    });
  });

  describe('Permission Handling', () => {
    it('should get notification permission', () => {
      const permission = getNotificationPermission();
      expect(['default', 'granted', 'denied']).toContain(permission);
    });
  });

  describe('Preferences Storage', () => {
    it('should return default preferences when none are stored', () => {
      const prefs = getNotificationPreferences();
      expect(prefs.enabled).toBe(true);
      expect(prefs.tradeAlerts).toBe(true);
      expect(prefs.sound).toBe(true);
      expect(prefs.vibration).toBe(true);
    });

    it('should save and retrieve preferences', async () => {
      const newPrefs: Partial<NotificationPreferences> = {
        enabled: false,
        tradeAlerts: false,
        sound: false,
      };

      await setNotificationPreferences(newPrefs);
      const retrieved = getNotificationPreferences();

      expect(retrieved.enabled).toBe(false);
      expect(retrieved.tradeAlerts).toBe(false);
      expect(retrieved.sound).toBe(false);
    });

    it('should preserve other preferences when updating partial', async () => {
      const initial = getNotificationPreferences();
      const update: Partial<NotificationPreferences> = {
        sound: false,
      };

      await setNotificationPreferences(update);
      const retrieved = getNotificationPreferences();

      expect(retrieved.sound).toBe(false);
      expect(retrieved.vibration).toBe(initial.vibration);
      expect(retrieved.tradeAlerts).toBe(initial.tradeAlerts);
    });
  });
});
