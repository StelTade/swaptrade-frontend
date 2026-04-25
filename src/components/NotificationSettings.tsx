'use client';

import { useEffect, useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import type { NotificationPreferences } from '@/lib/notifications';

interface NotificationSettingsProps {
  userId?: string;
  onClose?: () => void;
  compact?: boolean;
}

export default function NotificationSettings({
  userId,
  onClose,
  compact = false,
}: NotificationSettingsProps) {
  const {
    preferences,
    isPushSubscribed,
    isSubscribing,
    permissionStatus,
    loading,
    error,
    isSupported,
    isPushSupported,
    requestPermission,
    togglePushSubscription,
    updatePreferences,
  } = useNotifications(userId);

  const [localPrefs, setLocalPrefs] = useState<NotificationPreferences>(preferences);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLocalPrefs(preferences);
  }, [preferences]);

  const handleToggle = (key: keyof NotificationPreferences) => {
    const updated = { ...localPrefs, [key]: !localPrefs[key] };
    setLocalPrefs(updated);
    setSaved(false);
  };

  const handleSave = async () => {
    await updatePreferences(localPrefs);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleEnableNotifications = async () => {
    if (permissionStatus === 'default') {
      await requestPermission();
    }

    if (isPushSupported()) {
      await togglePushSubscription();
    }
  };

  if (!isSupported) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          Notifications are not supported in your browser.
        </p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              Push Notifications
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get trade updates in real-time
            </p>
          </div>
          <button
            onClick={handleEnableNotifications}
            disabled={isSubscribing}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isPushSubscribed
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubscribing ? 'Loading...' : isPushSubscribed ? 'Disable' : 'Enable'}
          </button>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notification Settings
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {saved && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">Settings saved successfully</p>
          </div>
        )}

        {/* Main Toggle */}
        <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Enable Notifications
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Allow SwapTrade to send you notifications
              </p>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={localPrefs.enabled}
                onChange={() => handleToggle('enabled')}
                className="w-5 h-5 rounded border-gray-300"
              />
            </label>
          </div>
        </div>

        {/* Push Notifications */}
        {isPushSupported() && (
          <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Push Notifications
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Receive notifications even when the app is closed
                </p>
              </div>
              <button
                onClick={handleEnableNotifications}
                disabled={isSubscribing || !localPrefs.enabled}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isPushSubscribed
                    ? 'bg-red-100 text-red-700 hover:bg-red-200 disabled:bg-red-50'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:bg-blue-50'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubscribing ? 'Loading...' : isPushSubscribed ? 'Disable' : 'Enable'}
              </button>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {permissionStatus === 'granted' && isPushSubscribed && (
                <p>✓ Push notifications are active</p>
              )}
              {permissionStatus === 'denied' && (
                <p>⚠ Push notifications are blocked by browser settings</p>
              )}
            </div>
          </div>
        )}

        {/* Notification Types */}
        {localPrefs.enabled && (
          <>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Notification Types
            </h3>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              {/* Trade Alerts */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-900 dark:text-white">
                    Trade Alerts
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get notified when trades are filled or cancelled
                  </p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localPrefs.tradeAlerts}
                    onChange={() => handleToggle('tradeAlerts')}
                    disabled={!localPrefs.enabled}
                    className="w-5 h-5 rounded border-gray-300 disabled:opacity-50"
                  />
                </label>
              </div>

              {/* Price Alerts */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-900 dark:text-white">
                    Price Alerts
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get notified when prices reach your targets
                  </p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localPrefs.priceAlerts}
                    onChange={() => handleToggle('priceAlerts')}
                    disabled={!localPrefs.enabled}
                    className="w-5 h-5 rounded border-gray-300 disabled:opacity-50"
                  />
                </label>
              </div>

              {/* Referral Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-900 dark:text-white">
                    Referral Notifications
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get notified when referrals join or reach milestones
                  </p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localPrefs.referralNotifications}
                    onChange={() => handleToggle('referralNotifications')}
                    disabled={!localPrefs.enabled}
                    className="w-5 h-5 rounded border-gray-300 disabled:opacity-50"
                  />
                </label>
              </div>

              {/* System Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-900 dark:text-white">
                    System Notifications
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get notified about system updates and maintenance
                  </p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localPrefs.systemNotifications}
                    onChange={() => handleToggle('systemNotifications')}
                    disabled={!localPrefs.enabled}
                    className="w-5 h-5 rounded border-gray-300 disabled:opacity-50"
                  />
                </label>
              </div>
            </div>

            {/* Sound and Vibration */}
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Notification Features
            </h3>

            <div className="space-y-4 mb-6">
              {/* Sound */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-900 dark:text-white">
                    Sound
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Play sound when notification arrives
                  </p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localPrefs.sound}
                    onChange={() => handleToggle('sound')}
                    disabled={!localPrefs.enabled}
                    className="w-5 h-5 rounded border-gray-300 disabled:opacity-50"
                  />
                </label>
              </div>

              {/* Vibration */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-900 dark:text-white">
                    Vibration
                  </label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Vibrate device when notification arrives
                  </p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localPrefs.vibration}
                    onChange={() => handleToggle('vibration')}
                    disabled={!localPrefs.enabled}
                    className="w-5 h-5 rounded border-gray-300 disabled:opacity-50"
                  />
                </label>
              </div>
            </div>
          </>
        )}

        {/* Save Button */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Close
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
