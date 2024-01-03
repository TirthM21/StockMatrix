import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentPriceFunds,
  getDetailsFunds,
  getHistoryFunds,
} from "../../api/mutual_funds";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  priceData: {},
  detailsData: {},
  historyData: [],
};

export const getMFCurentPriceThunk = createAsyncThunk(
  "mfDetails/price",
  async (symbol) => {
    try {
      let res = await getCurrentPriceFunds(symbol);
      return res;
    } catch (err) {
      return err?.response?.data;
    }
  }
);

export const getMFDetailsThunk = createAsyncThunk(
  "mfDetails/details",
  async (symbol) => {
    try {
      let res = await getDetailsFunds(symbol);
      return res;
    } catch (err) {
      return err?.response?.data;
    }
  }
);

export const getMFHistoryThunk = createAsyncThunk(
  "mfDetails/history",
  async ({ symbol, period, interval }) => {
    try {
      let res = await getHistoryFunds(symbol, period, interval);
      return res;
    } catch (err) {
      return err?.response?.data;
    }
  }
);

const mfDetailsSlice = createSlice({
  name: "mfDetails",
  initialState,
  reducers: {
    clearMFDetails: () => initialState,
    clearMFHistory: (state) => {
      state.historyData = [];
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getMFCurentPriceThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMFCurentPriceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.priceData = payload;
      })
      .addCase(getMFCurentPriceThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getMFDetailsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMFDetailsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.detailsData = payload;
      })
      .addCase(getMFDetailsThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getMFHistoryThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMFHistoryThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.historyData = payload;
      })
      .addCase(getMFHistoryThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearMFDetails, clearMFHistory } = mfDetailsSlice.actions;

export default mfDetailsSlice.reducer;
