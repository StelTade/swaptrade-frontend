'use client';

import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  loadNotificationPreferences,
  updateNotificationPreferences,
  subscribeToPush,
  unsubscribeFromPush,
  checkPushSubscriptionStatus,
  setPermissionStatus,
} from '@/store/notificationSlice';
import {
  isNotificationSupported,
  isPushSupported,
  getNotificationPermission,
  requestNotificationPermission,
} from '@/lib/notifications';

/**
 * Hook for managing notification permissions and subscriptions
 * Handles initialization, permission requests, and subscription management
 */
export function useNotifications(userId?: string) {
  const dispatch = useAppDispatch();
  const notificationState = useAppSelector((state) => state.notifications);

  // Initialize notifications on mount
  useEffect(() => {
    if (!isNotificationSupported()) return;

    // Load stored preferences
    dispatch(loadNotificationPreferences());

    // Check current permission status
    const permission = getNotificationPermission();
    dispatch(setPermissionStatus(permission));

    // Check push subscription status
    if (isPushSupported()) {
      dispatch(checkPushSubscriptionStatus());
    }
  }, [dispatch]);

  /**
   * Request permission from user
   */
  const requestPermission = useCallback(async () => {
    if (!isNotificationSupported()) {
      return false;
    }

    try {
      const granted = await requestNotificationPermission();
      dispatch(setPermissionStatus(getNotificationPermission()));
      return granted;
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }, [dispatch]);

  /**
   * Subscribe to push notifications
   */
  const subscribe = useCallback(async () => {
    if (!isPushSupported() || !userId) {
      console.warn('Push not supported or userId missing');
      return;
    }

    try {
      // Request permission first
      const granted = await requestPermission();
      if (!granted) return;

      // Subscribe to push
      await dispatch(subscribeToPush(userId)).unwrap();
    } catch (error) {
      console.error('Failed to subscribe to notifications:', error);
    }
  }, [userId, dispatch, requestPermission]);

  /**
   * Unsubscribe from push notifications
   */
  const unsubscribe = useCallback(async () => {
    if (!isPushSupported()) return;

    try {
      await dispatch(unsubscribeFromPush()).unwrap();
    } catch (error) {
      console.error('Failed to unsubscribe from notifications:', error);
    }
  }, [dispatch]);

  /**
   * Toggle push subscription
   */
  const togglePushSubscription = useCallback(async () => {
    if (notificationState.isPushSubscribed) {
      await unsubscribe();
    } else {
      await subscribe();
    }
  }, [notificationState.isPushSubscribed, subscribe, unsubscribe]);

  /**
   * Update notification preferences
   */
  const updatePreferences = useCallback(
    async (preferences: Parameters<typeof updateNotificationPreferences>[0]['preferences']) => {
      try {
        await dispatch(updateNotificationPreferences({ preferences, userId })).unwrap();
      } catch (error) {
        console.error('Failed to update notification preferences:', error);
      }
    },
    [dispatch, userId]
  );

  return {
    // State
    preferences: notificationState.preferences,
    isPushSubscribed: notificationState.isPushSubscribed,
    isSubscribing: notificationState.isSubscribing,
    permissionStatus: notificationState.permissionStatus,
    loading: notificationState.loading,
    error: notificationState.error,

    // Actions
    requestPermission,
    subscribe,
    unsubscribe,
    togglePushSubscription,
    updatePreferences,

    // Checks
    isSupported: isNotificationSupported(),
    isPushSupported: isPushSupported(),
    canRequest: notificationState.permissionStatus === 'default',
    isGranted: notificationState.permissionStatus === 'granted',
    isDenied: notificationState.permissionStatus === 'denied',
  };
}

/**
 * Hook for monitoring notification state
 */
export function useNotificationState() {
  const notificationState = useAppSelector((state) => state.notifications);
  return notificationState;
}

/**
 * Hook for checking if notifications are available
 */
export function useNotificationAvailability() {
  return {
    isSupported: isNotificationSupported(),
    isPushSupported: isPushSupported(),
    permission: getNotificationPermission(),
  };
}
