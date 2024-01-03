import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDetailsEtf, getHistoricalDataEtf } from "../../api/etfs";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  details: {},
  historicalData: {},
};

export const getETFDetailsThunk = createAsyncThunk(
  "etfDetails/details",
  async (symbol) => {
    try {
      let response = await getDetailsEtf(symbol);
      return response;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const getETFHistoryThunk = createAsyncThunk(
  "mfDetails/history",
  async ({ symbol, period, interval }) => {
    try {
      let res = await getHistoricalDataEtf(symbol, period, interval);
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

const etfDetailsSlice = createSlice({
  name: "etfDetails",
  initialState,
  reducers: {
    clearETFDetails: () => initialState,
    clearETFHistoricalData: (state) => {
      state.historicalData = [];
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getETFDetailsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getETFDetailsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.details = payload;
      })
      .addCase(getETFDetailsThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getETFHistoryThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getETFHistoryThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.historicalData = payload;
      })
      .addCase(getETFHistoryThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearETFDetails, clearETFHistoricalData } =
  etfDetailsSlice.actions;

export default etfDetailsSlice.reducer;
