import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToWatchlist, removeWatchlist } from "../../api/watchlist";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
};

export const addToWatchlistThunk = createAsyncThunk(
  "watchlist/add",
  async (data) => {
    try {
      let res = await addToWatchlist(data);
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const removeWatchlistThunk = createAsyncThunk(
  "watchlist/remove",
  async ({ type, id }) => {
    try {
      let res = await removeWatchlist(type, id);
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    clearWatchlist: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(addToWatchlistThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWatchlistThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addToWatchlistThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(removeWatchlistThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeWatchlistThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(removeWatchlistThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;
