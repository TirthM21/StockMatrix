import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { verifyLogin } from "../../api/verify";

let initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
};

export const verifyLoginThunk = createAsyncThunk(
  "verifyLogin/post",
  async (token) => {
    try {
      let res = await verifyLogin(token);
      return res;
    } catch (err) {
      return err;
    }
  }
);

const verifyLoginSlice = createSlice({
  name: "verifyLogin",
  initialState,
  reducers: {
    clearVerifyLogin: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(verifyLoginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyLoginThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(verifyLoginThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearVerifyLogin } = verifyLoginSlice.actions;

export default verifyLoginSlice.reducer;
