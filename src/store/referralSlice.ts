import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Referral {
  displayName: string;
  verified: boolean;
  joinedAt: number;
}

export interface DashboardData {
  userId: string;
  points: number;
  rank: number;
  referralCode: string | null;
  totalReferrals: number;
  successfulReferrals: number;
  referrals: Referral[];
}

export interface ShareAnalytics {
  totalShares: number;
  sharesByChannel: Record<string, number>;
}

export type ShareChannel = 'twitter' | 'facebook' | 'whatsapp' | 'copy' | 'qr';

interface ReferralState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  analytics: ShareAnalytics | null;
  analyticsLoading: boolean;
  analyticsError: string | null;
}

const initialState: ReferralState = {
  data: null,
  loading: false,
  error: null,
  analytics: null,
  analyticsLoading: false,
  analyticsError: null,
};

export const fetchDashboard = createAsyncThunk<DashboardData, string>(
  "referral/fetchDashboard",
  async (userId, { rejectWithValue }) => {
    const res = await fetch(`/api/users/${userId}/dashboard`);
    if (res.status === 403) return rejectWithValue("Your account is not yet verified.");
    if (!res.ok) return rejectWithValue("Failed to load dashboard.");
    return res.json();
  }
);

export const trackShare = createAsyncThunk<
  { success: boolean; shareId?: string },
  { userId: string; referralCode?: string; shareChannel: ShareChannel }
>(
  "referral/trackShare",
  async ({ userId, referralCode, shareChannel }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/users/${userId}/share-tracking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referralCode, shareChannel }),
      });
      if (!res.ok) return rejectWithValue("Failed to track share");
      return res.json();
    } catch {
      return rejectWithValue("Failed to track share");
    }
  }
);

export const fetchShareAnalytics = createAsyncThunk<
  ShareAnalytics,
  string
>(
  "referral/fetchShareAnalytics",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/users/${userId}/share-tracking`);
      if (!res.ok) return rejectWithValue("Failed to load analytics");
      const data = await res.json();
      return data.analytics;
    } catch {
      return rejectWithValue("Failed to load analytics");
    }
  }
);

const referralSlice = createSlice({
  name: "referral",
  initialState,
  reducers: {
    clearDashboard(state) {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action: PayloadAction<DashboardData>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Something went wrong.";
      })
      .addCase(trackShare.pending, () => {
        // No state change needed for tracking
      })
      .addCase(trackShare.fulfilled, () => {
        // Track successful - optionally refetch analytics
      })
      .addCase(trackShare.rejected, (_, action) => {
        console.error("Share tracking failed:", action.payload);
      })
      .addCase(fetchShareAnalytics.pending, (state) => {
        state.analyticsLoading = true;
        state.analyticsError = null;
      })
      .addCase(fetchShareAnalytics.fulfilled, (state, action: PayloadAction<ShareAnalytics>) => {
        state.analyticsLoading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchShareAnalytics.rejected, (state, action) => {
        state.analyticsLoading = false;
        state.analyticsError = (action.payload as string) ?? "Something went wrong.";
      });
  },
});

export const { clearDashboard } = referralSlice.actions;
export default referralSlice.reducer;
