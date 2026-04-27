/**
 * Notifications Service
 * Handles push notifications, permissions, and subscription management for trade alerts
 */

export type NotificationType = 'trade' | 'price-alert' | 'referral' | 'system';

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: Record<string, unknown>;
  requireInteraction?: boolean;
}

export interface NotificationPreferences {
  enabled: boolean;
  tradeAlerts: boolean;
  priceAlerts: boolean;
  referralNotifications: boolean;
  systemNotifications: boolean;
  sound: boolean;
  vibration: boolean;
}

const DEFAULTS: NotificationPreferences = {
  enabled: true,
  tradeAlerts: true,
  priceAlerts: true,
  referralNotifications: true,
  systemNotifications: true,
  sound: true,
  vibration: true,
};

/**
 * Check if notifications are supported in the browser
 */
export function isNotificationSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    ('Notification' in window || 'serviceWorker' in navigator)
  );
}

/**
 * Check if the browser has Web Push API support
 */
export function isPushSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  );
}

/**
 * Get current notification permission status
 */
export function getNotificationPermission(): NotificationPermission {
  if (typeof window === 'undefined') return 'denied';
  return Notification.permission;
}

/**
 * Request notification permission from user
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) return false;

  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Failed to request notification permission:', error);
    return false;
  }
}

/**
 * Show a browser notification
 */
export async function showNotification(
  payload: NotificationPayload
): Promise<Notification | null> {
  if (!isNotificationSupported()) {
    console.warn('Notifications not supported');
    return null;
  }

  if (Notification.permission !== 'granted') {
    console.warn('Notification permission not granted');
    return null;
  }

  if (typeof window === 'undefined' || !navigator.serviceWorker.controller) {
    // Fallback to standard notification
    return new Notification(payload.title, {
      body: payload.body,
      icon: payload.icon,
      badge: payload.badge,
      tag: payload.tag,
      requireInteraction: payload.requireInteraction,
    });
  }

  // Send message to service worker to show notification
  try {
    navigator.serviceWorker.controller.postMessage({
      type: 'SHOW_NOTIFICATION',
      payload,
    });
    return null; // Service worker handles the notification
  } catch (error) {
    console.error('Failed to show notification:', error);
    return null;
  }
}

/**
 * Subscribe to push notifications
 * Returns the subscription if successful
 */
export async function subscribeToPushNotifications(
  userId: string
): Promise<PushSubscription | null> {
  if (!isPushSupported()) {
    console.warn('Push notifications not supported');
    return null;
  }

  try {
    // Get service worker registration
    const registration = await navigator.serviceWorker.ready;

    // Check if already subscribed
    let subscription = await registration.pushManager.getSubscription();
    if (subscription) return subscription;

    // Request permission first
    const permissionGranted = await requestNotificationPermission();
    if (!permissionGranted) return null;

    // Subscribe to push notifications
    // Note: VAPID public key should be provided by backend
    const subscribeOptions = {
      userVisibleOnly: true,
      // applicationServerKey will be set by the backend
    };

    subscription = await registration.pushManager.subscribe(subscribeOptions);

    // Save subscription endpoint to backend
    await saveSubscription(subscription, userId);

    return subscription;
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error);
    return null;
  }
}

/**
 * Unsubscribe from push notifications
 */
export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  if (!isPushSupported()) return false;

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      // Remove from backend
      await removeSubscription(subscription);
      // Unsubscribe from push manager
      return await subscription.unsubscribe();
    }

    return true;
  } catch (error) {
    console.error('Failed to unsubscribe from push notifications:', error);
    return false;
  }
}

/**
 * Check if user is subscribed to push notifications
 */
export async function isPushSubscribed(): Promise<boolean> {
  if (!isPushSupported()) return false;

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return subscription !== null;
  } catch (error) {
    console.error('Failed to check push subscription:', error);
    return false;
  }
}

/**
 * Get notification preferences from localStorage
 */
export function getNotificationPreferences(): NotificationPreferences {
  if (typeof window === 'undefined') return DEFAULTS;

  try {
    const stored = localStorage.getItem('swaptrade_notification_prefs');
    return stored ? JSON.parse(stored) : DEFAULTS;
  } catch (error) {
    console.error('Failed to get notification preferences:', error);
    return DEFAULTS;
  }
}

/**
 * Save notification preferences to localStorage and backend
 */
export async function setNotificationPreferences(
  prefs: Partial<NotificationPreferences>,
  userId?: string
): Promise<void> {
  if (typeof window === 'undefined') return;

  try {
    const current = getNotificationPreferences();
    const updated = { ...current, ...prefs };

    // Save locally
    localStorage.setItem('swaptrade_notification_prefs', JSON.stringify(updated));

    // Save to backend if userId provided
    if (userId) {
      await fetch('/api/notifications/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, preferences: updated }),
      });
    }
  } catch (error) {
    console.error('Failed to save notification preferences:', error);
  }
}

/**
 * Send a trade notification
 */
export async function sendTradeNotification(tradeData: {
  symbol: string;
  action: 'buy' | 'sell';
  price: number;
  quantity: number;
  status?: 'pending' | 'filled' | 'cancelled';
  orderId?: string;
}): Promise<void> {
  const prefs = getNotificationPreferences();

  if (!prefs.enabled || !prefs.tradeAlerts) return;

  const title = `Trade ${tradeData.action.toUpperCase()}`;
  const body = `${tradeData.quantity} ${tradeData.symbol} @ $${tradeData.price.toFixed(2)}${
    tradeData.status ? ` - ${tradeData.status}` : ''
  }`;

  await showNotification({
    type: 'trade',
    title,
    body,
    tag: `trade-${tradeData.orderId || Date.now()}`,
    data: tradeData,
    requireInteraction: tradeData.status === 'filled',
  });
}

/**
 * Save push subscription to backend
 */
async function saveSubscription(
  subscription: PushSubscription,
  userId: string
): Promise<void> {
  try {
    const response = await fetch('/api/notifications/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        subscription: subscription.toJSON(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save subscription');
    }
  } catch (error) {
    console.error('Failed to save push subscription:', error);
    throw error;
  }
}

/**
 * Remove push subscription from backend
 */
async function removeSubscription(subscription: PushSubscription): Promise<void> {
  try {
    const response = await fetch('/api/notifications/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: subscription.endpoint,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to remove subscription');
    }
  } catch (error) {
    console.error('Failed to remove push subscription:', error);
    throw error;
  }
}
