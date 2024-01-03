import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllStocks } from "../../api/stocks";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  bseData: {},
};

const allBSEStocksThunk = createAsyncThunk(
  "allStocks/bse",
  async (skip, limit) => {
    const res = await getAllStocks("BSE", skip, limit);
    return res;
  }
);

const allBSEStocksSlice = createSlice({
  name: "allStocks",
  initialState,
  reducers: {
    clearBSEStocksState: () => {
      return {
        bseData: {},
      };
    },
  },
  extraReducers: (build) => {
    build
      .addCase(allBSEStocksThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allBSEStocksThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bseData = payload;
      })
      .addCase(allBSEStocksThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearBSEStocksState } =
allBSEStocksSlice.actions;

export default allBSEStocksSlice.reducer;