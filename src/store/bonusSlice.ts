import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface BonusAdjustment {
  id: string;
  delta: number;
  action: string;
  reason: string;
  createdAt: number;
}

export interface BonusData {
  totalBonuses: number;
  history: BonusAdjustment[];
  lastUpdated: number;
}

interface BonusState {
  data: BonusData | null;
  loading: boolean;
  error: string | null;
}

const initialState: BonusState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchBonuses = createAsyncThunk<BonusData, string>(
  "bonus/fetchBonuses",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/users/${userId}/bonuses`);
      if (!res.ok) {
        throw new Error("Failed to load bonuses.");
      }
      return await res.json();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred.";
      return rejectWithValue(message);
    }
  }
);

const bonusSlice = createSlice({
  name: "bonus",
  initialState,
  reducers: {
    clearBonusData(state) {
      state.data = null;
      state.error = null;
    },
    // Optimistic update for real-time notifications
    addOptimisticBonus(state, action: PayloadAction<BonusAdjustment>) {
      if (state.data) {
        state.data.totalBonuses += action.payload.delta;
        state.data.history.unshift(action.payload);
        state.data.lastUpdated = Date.now();
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBonuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBonuses.fulfilled, (state, action: PayloadAction<BonusData>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBonuses.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Something went wrong.";
      });
  },
});

export const { clearBonusData, addOptimisticBonus } = bonusSlice.actions;
export default bonusSlice.reducer;
