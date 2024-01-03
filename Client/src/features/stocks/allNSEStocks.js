import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllStocks } from "../../api/stocks";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  nseData: [],
};

export const allNSEStocksThunk = createAsyncThunk(
  "allStocks/nse",
  async ({ skip, limit }) => {
    try {
      const res = await getAllStocks("NSE", Number(skip), Number(limit));
      return res;
    } catch (err) {
      return err.response.data;
    }
  }
);

const allNSEStocksSlice = createSlice({
  name: "allStocks",
  initialState,
  reducers: {
    clearNSEStocksState: () => {
      return {
        nseData: {},
      };
    },
  },
  extraReducers: (build) => {
    build
      .addCase(allNSEStocksThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allNSEStocksThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.nseData = payload;
      })
      .addCase(allNSEStocksThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearNSEStocksState } = allNSEStocksSlice.actions;

export default allNSEStocksSlice.reducer;
