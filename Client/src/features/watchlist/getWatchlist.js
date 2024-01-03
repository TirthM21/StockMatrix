import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getETFsWatchlist,
  getMFWatchlist,
  getStocksWatchlist,
} from "../../api/watchlist";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  stocksWatchlist: [],
  mfsWatchlist: [],
  etfsWatchlist: [],
};

export const getStocksWatchlistThunk = createAsyncThunk(
  "watchlist/stocks",
  async () => {
    try {
      let res = await getStocksWatchlist();
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const getMFsWatchlistThunk = createAsyncThunk(
  "watchlist/mfs",
  async () => {
    try {
      let res = await getMFWatchlist();
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const getETFsWatchlistThunk = createAsyncThunk(
  "watchlist/etfs",
  async () => {
    try {
      let res = await getETFsWatchlist();
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

const getWatchlistSlice = createSlice({
  name: "getWatchlist",
  initialState,
  reducers: {
    clearGetWatchlist: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(getStocksWatchlistThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStocksWatchlistThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stocksWatchlist = payload?.stocksData;
      })
      .addCase(getStocksWatchlistThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getMFsWatchlistThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMFsWatchlistThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mfsWatchlist = payload?.mutualFundsData;
      })
      .addCase(getMFsWatchlistThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getETFsWatchlistThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getETFsWatchlistThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.etfsWatchlist = payload?.etfsData;
      })
      .addCase(getETFsWatchlistThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearGetWatchlist } = getWatchlistSlice.actions;

export default getWatchlistSlice.reducer;
