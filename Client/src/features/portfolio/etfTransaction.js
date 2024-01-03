import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { buyETF, sellETFs } from "../../api/portfolio";

const initialState = {
  isSuccess: false,
  isError: false,
  isLoading: false,
};

export const buyETFThunk = createAsyncThunk(
  "etfTransaction/buyETF",
  async (data) => {
    try {
      let res = await buyETF(data);
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const sellETFThunk = createAsyncThunk(
  "etfTransaction/sell",
  async (data) => {
    try {
      let res = await sellETFs(data);
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

const etfTransaction = createSlice({
  name: "etfTransaction",
  initialState,
  reducers: {
    clearETFTransaction: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(buyETFThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(buyETFThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(buyETFThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(sellETFThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sellETFThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(sellETFThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearETFTransaction } = etfTransaction.actions;

export default etfTransaction.reducer;
