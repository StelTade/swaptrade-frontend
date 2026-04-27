'use client';

import { useState, useCallback } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationSettings from '@/components/NotificationSettings';

interface NotificationBellProps {
  userId?: string;
  className?: string;
}

export default function NotificationBell({ userId, className = '' }: NotificationBellProps) {
  const [showSettings, setShowSettings] = useState(false);
  const {
    preferences,
    isPushSubscribed,
    permissionStatus,
    isSupported,
    isPushSupported,
  } = useNotifications(userId);

  if (!isSupported && !isPushSupported) {
    return null;
  }

  const isEnabled = preferences.enabled && permissionStatus === 'granted';
  const hasUnreadStatus = permissionStatus === 'default';

  return (
    <>
      <button
        onClick={() => setShowSettings(true)}
        className={`relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${className}`}
        aria-label="Notification settings"
        title={
          isPushSubscribed
            ? 'Notifications enabled'
            : 'Click to enable notifications'
        }
      >
        <svg
          className={`w-6 h-6 ${
            isEnabled ? 'text-green-600' : 'text-gray-400'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {/* Status indicator */}
        {hasUnreadStatus && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
        )}
        {isPushSubscribed && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
        )}
      </button>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <NotificationSettings
              userId={userId}
              onClose={() => setShowSettings(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
