import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendEmailLoginVerify } from "../../api/email";

let initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
};

export const sendEmailLoginThunk = createAsyncThunk(
  "sendEmailLogin/verify",
  async (id) => {
    try {
      let res = await sendEmailLoginVerify(id);
      return res;
    } catch (err) {
      return err;
    }
  }
);

const sendLoginEmailSlice = createSlice({
  name: "sendEmailLogin",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(sendEmailLoginThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendEmailLoginThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(sendEmailLoginThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default sendLoginEmailSlice.reducer;
