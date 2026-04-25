import {
  getPremiumWaitlistStats,
  getCapacityInfo,
  getPositionForEmail,
  isEmailOnWaitlist,
} from '@/lib/premium-analytics';

/**
 * Tests for premium waitlist analytics
 */
describe('Premium Analytics', () => {
  describe('Waitlist Stats', () => {
    it('should return waitlist statistics', () => {
      const stats = getPremiumWaitlistStats();

      expect(stats).toHaveProperty('totalSignups');
      expect(stats).toHaveProperty('todaySignups');
      expect(stats).toHaveProperty('weekSignups');
      expect(stats).toHaveProperty('averagePositionWait');
      expect(stats).toHaveProperty('estimatedConversionRate');

      expect(typeof stats.totalSignups).toBe('number');
      expect(typeof stats.todaySignups).toBe('number');
      expect(typeof stats.estimatedConversionRate).toBe('number');
    });

    it('should have sensible metric ranges', () => {
      const stats = getPremiumWaitlistStats();

      expect(stats.totalSignups).toBeGreaterThanOrEqual(0);
      expect(stats.todaySignups).toBeGreaterThanOrEqual(0);
      expect(stats.weekSignups).toBeGreaterThanOrEqual(stats.todaySignups);
      expect(stats.estimatedConversionRate).toBeGreaterThanOrEqual(0);
      expect(stats.estimatedConversionRate).toBeLessThanOrEqual(1);
    });
  });

  describe('Capacity Info', () => {
    it('should return capacity information', () => {
      const capacity = getCapacityInfo();

      expect(capacity).toHaveProperty('capacity');
      expect(capacity).toHaveProperty('filled');
      expect(capacity).toHaveProperty('remaining');
      expect(capacity).toHaveProperty('percentageFilled');
      expect(capacity).toHaveProperty('isFull');

      expect(capacity.capacity).toBe(500);
    });

    it('should have valid capacity calculations', () => {
      const capacity = getCapacityInfo();

      expect(capacity.filled + capacity.remaining).toBe(capacity.capacity);
      expect(capacity.percentageFilled).toBe((capacity.filled / capacity.capacity) * 100);
      expect(capacity.isFull).toBe(capacity.remaining === 0);
    });

    it('should correctly identify when full', () => {
      const capacity = getCapacityInfo();

      if (capacity.filled === 500) {
        expect(capacity.isFull).toBe(true);
        expect(capacity.remaining).toBe(0);
      } else {
        expect(capacity.isFull).toBe(false);
      }
    });
  });

  describe('Position Tracking', () => {
    it('should return null for non-existent email', () => {
      const position = getPositionForEmail('nonexistent@example.com');
      expect(position).toBeNull();
    });

    it('should correctly identify email on waitlist', () => {
      const onWaitlist = isEmailOnWaitlist('nonexistent@example.com');
      expect(typeof onWaitlist).toBe('boolean');
    });
  });
});
