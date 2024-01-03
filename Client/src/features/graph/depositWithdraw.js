import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDepositGraph, getWithdrawGraph } from "../../api/graph";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  deposit: {},
  withdraw: {},
};

export const getDepositGraphThunk = createAsyncThunk(
  "depositWithdrawGraph/deposit",
  async () => {
    try {
      let res = await getDepositGraph();
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const getWithdrawGraphThunk = createAsyncThunk(
  "depositWithdrawGraph/withdraw",
  async () => {
    try {
      let res = await getWithdrawGraph();
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

const depositWithdrawGraphSlice = createSlice({
  name: "depositWithdrawGraph",
  initialState,
  reducers: {
    clearDepositWithdrawGraph: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(getDepositGraphThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDepositGraphThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deposit = payload;
      })
      .addCase(getDepositGraphThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getWithdrawGraphThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWithdrawGraphThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.withdraw = payload;
      })
      .addCase(getWithdrawGraphThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearDepositWithdrawGraph } = depositWithdrawGraphSlice.actions;

export default depositWithdrawGraphSlice.reducer;
