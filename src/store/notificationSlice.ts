import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { NotificationPreferences } from '@/lib/notifications';
import {
  getNotificationPreferences,
  setNotificationPreferences,
  subscribeToPushNotifications,
  unsubscribeFromPushNotifications,
  isPushSubscribed,
  getNotificationPermission,
} from '@/lib/notifications';

export interface NotificationState {
  preferences: NotificationPreferences;
  isPushSubscribed: boolean;
  isSubscribing: boolean;
  permissionStatus: NotificationPermission;
  loading: boolean;
  error: string | null;
  lastNotification: {
    id: string;
    timestamp: number;
    type: string;
  } | null;
}

const initialState: NotificationState = {
  preferences: {
    enabled: true,
    tradeAlerts: true,
    priceAlerts: true,
    referralNotifications: true,
    tradingBonusAlerts: true,
    systemNotifications: true,
    sound: true,
    vibration: true,
  },
  isPushSubscribed: false,
  isSubscribing: false,
  permissionStatus: 'default',
  loading: false,
  error: null,
  lastNotification: null,
};

/**
 * Load notification preferences from storage
 */
export const loadNotificationPreferences = createAsyncThunk(
  'notifications/loadPreferences',
  async () => {
    return getNotificationPreferences();
  }
);

/**
 * Update notification preferences
 */
export const updateNotificationPreferences = createAsyncThunk(
  'notifications/updatePreferences',
  async (
    {
      preferences,
      userId,
    }: { preferences: Partial<NotificationPreferences>; userId?: string },
    { rejectWithValue }
  ) => {
    try {
      await setNotificationPreferences(preferences, userId);
      return { ...getNotificationPreferences(), ...preferences };
    } catch {
      return rejectWithValue('Failed to update preferences');
    }
  }
);

/**
 * Subscribe to push notifications
 */
export const subscribeToPush = createAsyncThunk(
  'notifications/subscribe',
  async (userId: string, { rejectWithValue }) => {
    try {
      const subscription = await subscribeToPushNotifications(userId);
      return !!subscription;
    } catch {
      return rejectWithValue('Failed to subscribe to push notifications');
    }
  }
);

/**
 * Unsubscribe from push notifications
 */
export const unsubscribeFromPush = createAsyncThunk(
  'notifications/unsubscribe',
  async (_, { rejectWithValue }) => {
    try {
      await unsubscribeFromPushNotifications();
      return false;
    } catch {
      return rejectWithValue('Failed to unsubscribe from push notifications');
    }
  }
);

/**
 * Check push subscription status
 */
export const checkPushSubscriptionStatus = createAsyncThunk(
  'notifications/checkSubscription',
  async () => {
    const subscribed = await isPushSubscribed();
    return subscribed;
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    updatePreferences(
      state,
      action: PayloadAction<Partial<NotificationPreferences>>
    ) {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    setPermissionStatus(state, action: PayloadAction<NotificationPermission>) {
      state.permissionStatus = action.payload;
    },
    recordNotification(
      state,
      action: PayloadAction<{ id: string; type: string }>
    ) {
      state.lastNotification = {
        ...action.payload,
        timestamp: Date.now(),
      };
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Load preferences
    builder
      .addCase(loadNotificationPreferences.fulfilled, (state, action) => {
        state.preferences = action.payload;
        state.permissionStatus = getNotificationPermission();
      });

    // Update preferences
    builder
      .addCase(updateNotificationPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNotificationPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
      })
      .addCase(updateNotificationPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Subscribe to push
    builder
      .addCase(subscribeToPush.pending, (state) => {
        state.isSubscribing = true;
        state.error = null;
      })
      .addCase(subscribeToPush.fulfilled, (state, action) => {
        state.isSubscribing = false;
        state.isPushSubscribed = action.payload;
        state.permissionStatus = 'granted';
      })
      .addCase(subscribeToPush.rejected, (state, action) => {
        state.isSubscribing = false;
        state.error = action.payload as string;
      });

    // Unsubscribe from push
    builder
      .addCase(unsubscribeFromPush.pending, (state) => {
        state.isSubscribing = true;
        state.error = null;
      })
      .addCase(unsubscribeFromPush.fulfilled, (state) => {
        state.isSubscribing = false;
        state.isPushSubscribed = false;
      })
      .addCase(unsubscribeFromPush.rejected, (state, action) => {
        state.isSubscribing = false;
        state.error = action.payload as string;
      });

    // Check subscription status
    builder.addCase(checkPushSubscriptionStatus.fulfilled, (state, action) => {
      state.isPushSubscribed = action.payload;
    });
  },
});

export const {
  updatePreferences,
  setPermissionStatus,
  recordNotification,
  clearError,
} = notificationSlice.actions;

export default notificationSlice.reducer;
