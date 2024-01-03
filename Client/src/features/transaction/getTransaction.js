import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllDeposit, getAllWithdraws } from "../../api/transactions";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  withdraw: {},
  deposit: {},
};

export const getAllDepositThunk = createAsyncThunk(
  "getTransaction/deposit",
  async () => {
    try {
      let res = await getAllDeposit();
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const getAllWithdrawThunk = createAsyncThunk(
  "getTransaction/withdraw",
  async () => {
    try {
      let res = await getAllWithdraws();
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

const getTransactionSlice = createSlice({
  name: "getTransaction",
  initialState,
  reducers: {
    clearGetTransaction: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(getAllDepositThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDepositThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deposit = payload;
      })
      .addCase(getAllDepositThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getAllWithdrawThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllWithdrawThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.withdraw = payload;
      })
      .addCase(getAllWithdrawThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearGetTransaction } = getTransactionSlice.actions;

export default getTransactionSlice.reducer;
