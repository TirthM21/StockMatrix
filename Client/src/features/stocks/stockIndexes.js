import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIndexes } from "../../api/stocks";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  indexes: {},
};

export const getStockIndexesThunk = createAsyncThunk(
  "stockIndexes/get",
  async () => {
    try {
      let res = await getIndexes();
      return res;
    } catch (err) {
      return err;
    }
  }
);

const stockIndexesSlice = createSlice({
  name: "stockIndexes",
  initialState,
  reducers: {
    clearStockIndexesState: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(getStockIndexesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStockIndexesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.indexes = payload;
      })
      .addCase(getStockIndexesThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearStockIndexesState } = stockIndexesSlice.actions;

export default stockIndexesSlice.reducer;
