import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  updateBankDetails,
  updateUser,
  updateUserInfo,
  updateUserNominate,
} from "../../api/user";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
};

export const updateUserInfoThunk = createAsyncThunk(
  "updateData/userInfo",
  async (data) => {
    let res = await updateUserInfo(data);
    return res;
  }
);

export const updateUserThunk = createAsyncThunk(
  "updateData/user",
  async (data) => {
    let res = await updateUser(data);
    return res;
  }
);

export const updateBankThunk = createAsyncThunk(
  "updateData/bank",
  async (data) => {
    let res = await updateBankDetails(data);
    return res;
  }
);

export const updateNominateThunk = createAsyncThunk(
  "updateData/nominate",
  async (data) => {
    let res = await updateUserNominate(data);
    return res;
  }
);

const updateDataSlice = createSlice({
  name: "updateData",
  initialState,
  reducers: {
    clearUpdateState: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(updateUserInfoThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserInfoThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateUserInfoThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateBankThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBankThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateBankThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateNominateThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNominateThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateNominateThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearUpdateState } = updateDataSlice.actions;

export default updateDataSlice.reducer;
