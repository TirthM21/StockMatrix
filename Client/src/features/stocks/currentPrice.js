import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentPriceStocks } from "../../api/stocks";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  stock_price: {},
};

export const getStocksCurrentPriceThunk = createAsyncThunk(
  "stock_curr_price/get",
  async (symbol) => {
    const res = await getCurrentPriceStocks(symbol);
    return res;
  }
);

const stocksCurrentPriceSlice = createSlice({
  name: "stock_curr_price",
  initialState,
  reducers: {
    clearStockCurrentPrice: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(getStocksCurrentPriceThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStocksCurrentPriceThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stock_price = payload;
      })
      .addCase(getStocksCurrentPriceThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearStockCurrentPrice } = stocksCurrentPriceSlice.actions;

export default stocksCurrentPriceSlice.reducer;
