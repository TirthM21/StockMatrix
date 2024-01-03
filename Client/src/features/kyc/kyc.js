import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addKyc, approveKyc } from "../../api/kyc";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
};

export const addKycThunk = createAsyncThunk("kyc/add", async (data) => {
  try {
    let res = await addKyc(data);
    return res;
  } catch (err) {
    return err.response.data;
  }
});

export const approveKycThunk = createAsyncThunk("", async (data) => {
  try {
    let res = await approveKyc(data);
    return res;
  } catch (err) {
    return err.response.data;
  }
});

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    clearKycState: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(addKycThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addKycThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addKycThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(approveKycThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveKycThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(approveKycThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearKycState } = kycSlice.actions;

export default kycSlice.reducer;
