/**
 * Trade Notifications Utilities
 * Handles sending notifications for trade events
 */

import { showNotification } from '@/lib/notifications';
import type { NotificationPayload } from '@/lib/notifications';

export type TradeStatus = 'placed' | 'filled' | 'partially_filled' | 'cancelled' | 'rejected' | 'expired';
export type TradeAction = 'buy' | 'sell';

export interface TradeData {
  orderId: string;
  symbol: string;
  action: TradeAction;
  quantity: number;
  price: number;
  status: TradeStatus;
  timestamp: number;
  executedQuantity?: number;
  remainingQuantity?: number;
  averagePrice?: number;
  reason?: string;
}

export interface TradeNotificationOptions {
  userId?: string;
  timestamp?: boolean;
  requireInteraction?: boolean;
}

/**
 * Get notification title based on trade status
 */
export function getTradeNotificationTitle(
  action: TradeAction,
  status: TradeStatus
): string {
  const actionText = action.toUpperCase();

  switch (status) {
    case 'placed':
      return `Order Placed - ${actionText}`;
    case 'filled':
      return `Order Filled - ${actionText}`;
    case 'partially_filled':
      return `Partially Filled - ${actionText}`;
    case 'cancelled':
      return `Order Cancelled - ${actionText}`;
    case 'rejected':
      return `Order Rejected - ${actionText}`;
    case 'expired':
      return `Order Expired - ${actionText}`;
    default:
      return `Trade Update - ${actionText}`;
  }
}

/**
 * Get notification body based on trade data
 */
export function getTradeNotificationBody(trade: TradeData): string {
  const { symbol, quantity, price, status, executedQuantity, averagePrice } = trade;

  const baseInfo = `${quantity} ${symbol} @ $${price.toFixed(2)}`;

  switch (status) {
    case 'filled': {
      const executed = executedQuantity || quantity;
      const avgPrice = averagePrice?.toFixed(2) || price.toFixed(2);
      return `${executed} ${symbol} filled @ avg $${avgPrice}`;
    }
    case 'partially_filled': {
      const executed = executedQuantity || 0;
      const remaining = quantity - executed;
      return `${executed}/${quantity} filled, ${remaining} remaining`;
    }
    case 'cancelled':
      return `${baseInfo} - Order cancelled`;
    case 'rejected':
      return `${baseInfo} - Rejected${trade.reason ? `: ${trade.reason}` : ''}`;
    case 'expired':
      return `${baseInfo} - Order expired`;
    case 'placed':
    default:
      return baseInfo;
  }
}

/**
 * Determine if notification requires user interaction based on status
 */
export function shouldRequireInteraction(status: TradeStatus): boolean {
  return ['filled', 'rejected', 'cancelled', 'expired'].includes(status);
}

/**
 * Send a trade notification
 */
export async function notifyTrade(
  trade: TradeData,
  options: TradeNotificationOptions = {}
): Promise<void> {
  try {
    const title = getTradeNotificationTitle(trade.action, trade.status);
    const body = getTradeNotificationBody(trade);
    const requireInteraction = options.requireInteraction ?? shouldRequireInteraction(trade.status);

    const payload: NotificationPayload = {
      type: 'trade',
      title,
      body,
      tag: `trade-${trade.orderId}`,
      requireInteraction,
      data: {
        orderId: trade.orderId,
        symbol: trade.symbol,
        action: trade.action,
        status: trade.status,
        quantity: trade.quantity,
        price: trade.price,
        timestamp: trade.timestamp,
      },
    };

    await showNotification(payload);
  } catch (error) {
    console.error('Failed to send trade notification:', error);
  }
}

/**
 * Send a batch of trade notifications
 */
export async function notifyTradeBatch(
  trades: TradeData[],
  options: TradeNotificationOptions = {}
): Promise<void> {
  try {
    await Promise.all(trades.map((trade) => notifyTrade(trade, options)));
  } catch (error) {
    console.error('Failed to send batch trade notifications:', error);
  }
}

/**
 * Send a price alert notification
 */
export async function notifyPriceAlert(data: {
  symbol: string;
  currentPrice: number;
  targetPrice: number;
  direction: 'above' | 'below';
  timestamp?: number;
}): Promise<void> {
  try {
    const direction = data.direction === 'above' ? '↑' : '↓';
    const title = `Price Alert - ${data.symbol}`;
    const body = `${data.symbol} crossed $${data.targetPrice.toFixed(2)} at $${data.currentPrice.toFixed(2)} ${direction}`;

    const payload: NotificationPayload = {
      type: 'price-alert',
      title,
      body,
      tag: `alert-${data.symbol}-${Date.now()}`,
      data: {
        symbol: data.symbol,
        currentPrice: data.currentPrice,
        targetPrice: data.targetPrice,
        direction: data.direction,
      },
    };

    await showNotification(payload);
  } catch (error) {
    console.error('Failed to send price alert notification:', error);
  }
}

/**
 * Send a referral milestone notification
 */
export async function notifyReferralMilestone(data: {
  referralCount: number;
  bonusPoints: number;
  nextMilestone?: number;
}): Promise<void> {
  try {
    const title = 'Referral Milestone 🎉';
    const body = `Congratulations! You've reached ${data.referralCount} referrals. You earned ${data.bonusPoints} points${
      data.nextMilestone ? ` (${data.nextMilestone - data.referralCount} referrals to next milestone)` : ''
    }`;

    const payload: NotificationPayload = {
      type: 'referral',
      title,
      body,
      tag: `referral-milestone-${data.referralCount}`,
      requireInteraction: true,
      data,
    };

    await showNotification(payload);
  } catch (error) {
    console.error('Failed to send referral notification:', error);
  }
}

/**
 * Send a trading bonus notification
 */
export async function notifyTradingBonus(data: {
  amount: number;
  reason: string;
}): Promise<void> {
  try {
    const title = 'Trading Bonus Earned! 🚀';
    const body = `You earned ${data.amount} points: ${data.reason}`;

    const payload: NotificationPayload = {
      type: 'trading-bonus',
      title,
      body,
      tag: `trading-bonus-${Date.now()}`,
      requireInteraction: true,
      data,
    };

    await showNotification(payload);
  } catch (error) {
    console.error('Failed to send trading bonus notification:', error);
  }
}

/**
 * Hook for watching trade updates and sending notifications
 * Can be integrated with WebSocket or polling mechanism
 */
export class TradeNotificationWatcher {
  private userId: string;
  private previousTrades: Map<string, TradeData> = new Map();

  constructor(userId: string) {
    this.userId = userId;
  }

  /**
   * Process trade updates and send notifications for changes
   */
  async processTradeUpdate(trade: TradeData): Promise<void> {
    const previousTrade = this.previousTrades.get(trade.orderId);

    // Always notify on status change
    if (!previousTrade || previousTrade.status !== trade.status) {
      await notifyTrade(trade);
    }

    // Store the current state
    this.previousTrades.set(trade.orderId, trade);
  }

  /**
   * Process multiple trade updates
   */
  async processBatch(trades: TradeData[]): Promise<void> {
    await Promise.all(trades.map((trade) => this.processTradeUpdate(trade)));
  }

  /**
   * Clear watch history
   */
  clear(): void {
    this.previousTrades.clear();
  }
}

/**
 * Create a WebSocket event handler for real-time trade updates
 * Example usage for integration with backend trade stream
 */
export function createTradeNotificationHandler(userId: string) {
  const watcher = new TradeNotificationWatcher(userId);

  return {
    handleTradeUpdate: (trade: TradeData) => watcher.processTradeUpdate(trade),
    handleBatch: (trades: TradeData[]) => watcher.processBatch(trades),
    clear: () => watcher.clear(),
  };
}
