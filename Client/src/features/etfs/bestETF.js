import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBestEtf,
} from "../../api/etfs";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  bestETF: {},
};

export const getBestETFThunk = createAsyncThunk(
  "bestETF/get",
  async (type) => {
    try {
      let res = await getBestEtf(type);
      return res;
    } catch (err) {
      return err?.response?.data;
    }
  }
);

const bestETFSlice = createSlice({
  name: "bestETF",
  initialState,
  reducers: {
    clearBestETFState: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(getBestETFThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBestETFThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bestETF = payload;
      })
      .addCase(getBestETFThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearBestETFState } = bestETFSlice.actions;

export default bestETFSlice.reducer;
