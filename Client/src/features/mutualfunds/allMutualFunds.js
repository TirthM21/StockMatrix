import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllMutualFund } from "../../api/mutual_funds";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  allMF: {},
};

export const getAllMFThunk = createAsyncThunk(
  "allMutualFunds/get",
  async ({ skip, limit }) => {
    try {
      const res = await getAllMutualFund(Number(skip), Number(limit));
      return res;
    } catch (err) {
      return err.response.data;
    }
  }
);

const allMutualFundsSlice = createSlice({
  name: "allMutualFunds",
  initialState,
  reducers: {
    clearAllMFState: (state) => {
      state.allMF = {};
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getAllMFThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMFThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allMF = payload;
      })
      .addCase(getAllMFThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearAllMFState } = allMutualFundsSlice.actions;

export default allMutualFundsSlice.reducer;
