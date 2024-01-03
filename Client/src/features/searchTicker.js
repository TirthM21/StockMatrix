import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchETF, searchMF, searchStock } from "../api/search";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  stocks: [],
  mfs: [],
  etfs: [],
};

export const searchStockThunk = createAsyncThunk(
  "search/stocks",
  async (search) => {
    try {
      let res = await searchStock(search);
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const searchMFThunk = createAsyncThunk("search/mfs", async (search) => {
  try {
    let res = await searchMF(search);
    return res;
  } catch (err) {
    return err?.response.data;
  }
});

export const searchETFThunk = createAsyncThunk(
  "search/etfs",
  async (search) => {
    try {
      let res = await searchETF(search);
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(searchStockThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchStockThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stocks = payload;
      })
      .addCase(searchStockThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(searchMFThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchMFThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mfs = payload;
      })
      .addCase(searchMFThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(searchETFThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchETFThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.etfs = payload;
      })
      .addCase(searchETFThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
