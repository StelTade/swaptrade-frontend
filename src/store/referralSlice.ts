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

interface ReferralState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReferralState = {
  data: null,
  loading: false,
  error: null,
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
      });
  },
});

export const { clearDashboard } = referralSlice.actions;
export default referralSlice.reducer;
