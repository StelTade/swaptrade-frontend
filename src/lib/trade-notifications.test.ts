import {
  getTradeNotificationTitle,
  getTradeNotificationBody,
  shouldRequireInteraction,
  TradeNotificationWatcher,
} from '@/lib/trade-notifications';
import type { TradeData } from '@/lib/trade-notifications';

describe('Trade Notifications', () => {
  const mockTrade: TradeData = {
    orderId: 'order-123',
    symbol: 'BTC',
    action: 'buy',
    quantity: 1.5,
    price: 45000,
    status: 'filled',
    timestamp: Date.now(),
  };

  describe('Notification Title', () => {
    it('should create proper title for filled buy order', () => {
      const title = getTradeNotificationTitle('buy', 'filled');
      expect(title).toContain('Filled');
      expect(title).toContain('BUY');
    });

    it('should create proper title for cancelled sell order', () => {
      const title = getTradeNotificationTitle('sell', 'cancelled');
      expect(title).toContain('Cancelled');
      expect(title).toContain('SELL');
    });

    it('should handle all trade statuses', () => {
      const statuses = ['placed', 'filled', 'partially_filled', 'cancelled', 'rejected', 'expired'];
      statuses.forEach((status) => {
        const title = getTradeNotificationTitle('buy', status as TradeStatus);
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Notification Body', () => {
    it('should create basic trade info body', () => {
      const body = getTradeNotificationBody(mockTrade);
      expect(body).toContain('BTC');
      expect(body).toContain('1.5');
      expect(body).toContain('45000');
    });

    it('should include average price for filled orders', () => {
      const filledTrade = {
        ...mockTrade,
        status: 'filled' as const,
        executedQuantity: 1.5,
        averagePrice: 44950,
      };
      const body = getTradeNotificationBody(filledTrade);
      expect(body).toContain('44950');
    });

    it('should show remaining quantity for partial fills', () => {
      const partialTrade = {
        ...mockTrade,
        status: 'partially_filled' as const,
        executedQuantity: 0.75,
      };
      const body = getTradeNotificationBody(partialTrade);
      expect(body).toContain('0.75');
      expect(body).toContain('0.75');
    });

    it('should include cancellation reason when provided', () => {
      const cancelledTrade = {
        ...mockTrade,
        status: 'rejected' as const,
        reason: 'Insufficient funds',
      };
      const body = getTradeNotificationBody(cancelledTrade);
      expect(body).toContain('Insufficient funds');
    });
  });

  describe('Interaction Requirements', () => {
    it('should require interaction for filled orders', () => {
      expect(shouldRequireInteraction('filled')).toBe(true);
    });

    it('should require interaction for rejected orders', () => {
      expect(shouldRequireInteraction('rejected')).toBe(true);
    });

    it('should not require interaction for placed orders', () => {
      expect(shouldRequireInteraction('placed')).toBe(false);
    });

    it('should require interaction for cancelled orders', () => {
      expect(shouldRequireInteraction('cancelled')).toBe(true);
    });
  });

  describe('Trade Notification Watcher', () => {
    it('should initialize with user id', () => {
      const watcher = new TradeNotificationWatcher('user-123');
      expect(watcher).toBeTruthy();
    });

    it('should clear history on demand', () => {
      const watcher = new TradeNotificationWatcher('user-123');
      watcher.clear();
      expect(watcher).toBeTruthy();
    });
  });
});
