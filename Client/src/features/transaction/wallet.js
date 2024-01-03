import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWallet } from "../../api/transactions";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  wallet: {},
};

export const getWalletThunk = createAsyncThunk("wallet/get", async () => {
  try {
    let res = await getWallet();
    return res;
  } catch (err) {
    return err?.response.data;
  }
});

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    clearWalletState: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(getWalletThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWalletThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.wallet = payload;
      })
      .addCase(getWalletThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearWalletState } = walletSlice.actions;

export default walletSlice.reducer;
