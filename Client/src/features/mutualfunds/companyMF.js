import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCompanyFunds } from "../../api/mutual_funds";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  companyMF: {},
};

export const getCompanyMFThunk = createAsyncThunk(
  "companyMF/get",
  async ({ company, skip, limit }) => {
    try {
      let res = await getCompanyFunds(company, skip, limit);
      return res;
    } catch (err) {
      return err?.response?.data;
    }
  }
);

const companyMFSlice = createSlice({
  name: "companyMF",
  initialState,
  reducers: {
    clearCompanyMFState: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(getCompanyMFThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyMFThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companyMF = payload;
      })
      .addCase(getCompanyMFThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearCompanyMFState } = companyMFSlice.actions;

export default companyMFSlice.reducer;
