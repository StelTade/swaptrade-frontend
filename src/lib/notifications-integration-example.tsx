/**
 * Integration Example: Using Notifications in Dashboard
 * 
 * This file demonstrates how to integrate the notification system
 * into the SwapTrade dashboard for trade and price alerts.
 */

'use client';

import { useEffect, useRef } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import {
  notifyTrade,
  createTradeNotificationHandler,
  notifyPriceAlert,
  notifyReferralMilestone,
} from '@/lib/trade-notifications';
import NotificationSettings from '@/components/NotificationSettings';
import NotificationBell from '@/components/NotificationBell';
import type { TradeData } from '@/lib/trade-notifications';

/**
 * Example: Dashboard with notification integration
 */
export function DashboardWithNotifications({ userId }: { userId: string }) {
  const { preferences, isPushSubscribed } = useNotifications(userId);
  const tradeHandler = useRef(createTradeNotificationHandler(userId));

  // Setup real-time trade updates
  useEffect(() => {
    if (!preferences.enabled || !preferences.tradeAlerts) {
      return;
    }

    // Replace with actual WebSocket or polling endpoint
    const mockTradeStream = setInterval(() => {
      // Simulated trade update
      const mockTrade: TradeData = {
        orderId: `order-${Date.now()}`,
        symbol: 'BTC',
        action: Math.random() > 0.5 ? 'buy' : 'sell',
        quantity: 0.5,
        price: 45000,
        status: Math.random() > 0.5 ? 'filled' : 'placed',
        timestamp: Date.now(),
      };

      // Send notification
      tradeHandler.current.handleTradeUpdate(mockTrade);
    }, 30000); // Every 30 seconds

    return () => clearInterval(mockTradeStream);
  }, [preferences.enabled, preferences.tradeAlerts]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Dashboard</h1>
        <NotificationBell userId={userId} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600">Active Subscriptions</p>
          <p className="text-2xl font-bold">
            {isPushSubscribed ? 'Active' : 'Inactive'}
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600">Trade Alerts</p>
          <p className="text-2xl font-bold">
            {preferences.tradeAlerts ? 'On' : 'Off'}
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600">Sound</p>
          <p className="text-2xl font-bold">
            {preferences.sound ? 'Enabled' : 'Disabled'}
          </p>
        </div>
      </div>

      {/* Rest of dashboard content */}
    </div>
  );
}

/**
 * Example: Handle trade filled event from API
 */
export async function handleTradeFilledEvent(trade: TradeData) {
  try {
    // Send notification to user
    await notifyTrade(trade, {
      requireInteraction: true,
      timestamp: true,
    });

    // Log analytics
    console.log('Trade notification sent:', trade.orderId);
  } catch (error) {
    console.error('Failed to notify trade:', error);
  }
}

/**
 * Example: Setup price monitoring
 */
export function setupPriceMonitoring(symbol: string, targetPrice: number) {
  const monitorInterval = setInterval(async () => {
    try {
      // Fetch current price
      const response = await fetch(`/api/price/${symbol}`);
      const data = await response.json();
      const currentPrice = data.price;

      // Check if target is crossed
      if (currentPrice <= targetPrice) {
        await notifyPriceAlert({
          symbol,
          currentPrice,
          targetPrice,
          direction: 'below',
        });

        // Stop monitoring once target is hit
        clearInterval(monitorInterval);
      }
    } catch (error) {
      console.error('Failed to monitor price:', error);
    }
  }, 60000); // Check every minute

  return () => clearInterval(monitorInterval);
}

/**
 * Example: Send referral milestone notification
 */
export async function onReferralMilestoneReached(
  referralCount: number,
  bonusPoints: number
) {
  const milestones = [5, 10, 25, 50, 100];
  const nextMilestone = milestones.find((m) => m > referralCount);

  await notifyReferralMilestone({
    referralCount,
    bonusPoints,
    nextMilestone,
  });
}

/**
 * Example: Batch notification sending (admin/backend)
 */
export async function broadcastTradeNotification(
  userIds: string[],
  trade: TradeData
) {
  try {
    const response = await fetch('/api/notifications/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NOTIFICATION_API_KEY}`,
      },
      body: JSON.stringify({
        userIds,
        payload: {
          type: 'trade',
          title: `${trade.action.toUpperCase()} ${trade.symbol}`,
          body: `${trade.quantity} ${trade.symbol} @ $${trade.price}`,
          data: trade,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send notifications');
    }

    const result = await response.json();
    console.log(`Sent notifications to ${result.sent} users`);
  } catch (error) {
    console.error('Failed to broadcast notification:', error);
  }
}

/**
 * Example: Settings modal integration
 */
export function SettingsModal({ userId }: { userId: string }) {
  return (
    <div className="modal">
      <NotificationSettings userId={userId} compact={false} />
    </div>
  );
}

/**
 * Example: Inline notification controls
 */
export function CompactNotificationControls({ userId }: { userId: string }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <NotificationSettings userId={userId} compact={true} />
    </div>
  );
}

export default {
  DashboardWithNotifications,
  handleTradeFilledEvent,
  setupPriceMonitoring,
  onReferralMilestoneReached,
  broadcastTradeNotification,
  SettingsModal,
  CompactNotificationControls,
};
