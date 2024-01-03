import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { buyStock, sellStocks } from "../../api/portfolio";

const initialState = {
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const buyStockThunk = createAsyncThunk(
  "stockTransaction/buyStock",
  async (data) => {
    try {
      let res = await buyStock(data);
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const sellStockThunk = createAsyncThunk("stockTransaction/sell", async (data) => {
  try {
    let res = await sellStocks(data);
    return res;
  } catch (err) {
    return err?.response.data;
  }
})

const stockTransaction = createSlice({
  name: "stockTransaction",
  initialState,
  reducers: {
    clearStockTransaction: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(buyStockThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(buyStockThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(buyStockThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(sellStockThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sellStockThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(sellStockThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearStockTransaction } = stockTransaction.actions;

export default stockTransaction.reducer;
