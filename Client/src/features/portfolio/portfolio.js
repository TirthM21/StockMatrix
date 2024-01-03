import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getETFPortfolio,
  getMutualFundPortfolio,
  getStockPortfolio,
  sipMFInvest,
} from "../../api/portfolio";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  stocks: {},
  mutualFunds: {},
  etfs: {},
};

export const getStockPortfolioThunk = createAsyncThunk(
  "portfolio/stocks",
  async () => {
    try {
      let res = await getStockPortfolio();
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const getMutualFundPortfolioThunk = createAsyncThunk(
  "portfolio/mutual-funds",
  async () => {
    try {
      let res = await getMutualFundPortfolio();
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const getETFPortfolioThunk = createAsyncThunk(
  "portfolio/etfs",
  async () => {
    try {
      let res = await getETFPortfolio();
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const sipMFInvestThunk = createAsyncThunk(
  "portfolio/sipMF",
  async ({ symbol, id }) => {
    try {
      let res = await sipMFInvest(symbol, id);
      return res;
    } catch (err) {
      return err?.response?.data;
    }
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    clearPortfolioState: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(getStockPortfolioThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStockPortfolioThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stocks = payload;
      })
      .addCase(getStockPortfolioThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getMutualFundPortfolioThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMutualFundPortfolioThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mutualFunds = payload;
      })
      .addCase(getMutualFundPortfolioThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getETFPortfolioThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getETFPortfolioThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.etfs = payload;
      })
      .addCase(getETFPortfolioThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearPortfolioState } = portfolioSlice.actions;

export default portfolioSlice.reducer;
