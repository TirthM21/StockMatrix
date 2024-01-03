import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllEtfs } from "../../api/etfs";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  allETF: {},
};

export const getAllETFThunk = createAsyncThunk(
  "allETF/get",
  async ({ skip, limit }) => {
    try {
      let res = await getAllEtfs(Number(skip), Number(limit));
      return res;
    } catch (err) {
      return err.response.data;
    }
  }
);

const allETFSlice = createSlice({
  name: "allETFs",
  initialState,
  reducers: {
    clearAllETFsState: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(getAllETFThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllETFThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allETF = payload;
      })
      .addCase(getAllETFThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearAllETFsState } = allETFSlice.actions;

export default allETFSlice.reducer;
