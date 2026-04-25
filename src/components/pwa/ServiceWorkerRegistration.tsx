'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { loadNotificationPreferences, checkPushSubscriptionStatus } from '@/store/notificationSlice';

export default function ServiceWorkerRegistration() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    // Register service worker
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then(() => {
        console.debug('Service worker registered successfully');
        
        // Initialize notifications after SW is registered
        dispatch(loadNotificationPreferences());
        if ('PushManager' in window) {
          dispatch(checkPushSubscriptionStatus());
        }
      })
      .catch((err) => {
        console.error('Service worker registration failed:', err);
      });
  }, [dispatch]);

  return null;
}
