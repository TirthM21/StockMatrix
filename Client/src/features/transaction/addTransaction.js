import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDeposit, addWithdraw } from "../../api/transactions";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
};

export const addDepositThunk = createAsyncThunk(
  "addTransaction/deposit",
  async (data) => {
    try {
      let res = await addDeposit(data);
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const addWithdrawThunk = createAsyncThunk(
  "addTransaction/withdraw",
  async (data) => {
    try {
      let res = await addWithdraw(data);
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

const addTransactionSlice = createSlice({
  name: "addTransaction",
  initialState,
  reducers: {
    clearAddTransaction: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(addDepositThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDepositThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addDepositThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addWithdrawThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addWithdrawThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addWithdrawThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearAddTransaction } = addTransactionSlice.actions;

export default addTransactionSlice.reducer;
