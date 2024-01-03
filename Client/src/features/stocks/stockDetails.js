import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBalanceSheet,
  getCashFlow,
  getFinancialRatios,
  getRevenueStmt,
  getStockHistoricalData,
  getStockInfo,
  getStockSuggestion,
  getCurrentPriceStocks,
  getAllStockDetails,
} from "../../api/stocks";

const initialState = {
  isSuccess: false,
  isError: false,
  isLoading: false,
  cashFlow: {},
  balanceSheet: {},
  revenueStmt: {},
  suggestion: {},
  historicalData: [],
  info: {},
  financial: {},
  priceData: {},
};

export const getStocksDetailsCurrentPriceThunk = createAsyncThunk(
  "stock_curr_price/get",
  async (symbol) => {
    const res = await getCurrentPriceStocks(symbol);
    return res;
  }
);

export const getCashFlowThunk = createAsyncThunk(
  "stockDetails/cashflow",
  async (sybmol) => {
    try {
      const res = await getCashFlow(sybmol);
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const getRevenueStmtThunk = createAsyncThunk(
  "stockDetails/revenueStmt",
  async (sybmol) => {
    try {
      const res = await getRevenueStmt(sybmol);
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const getBalanceSheetThunk = createAsyncThunk(
  "stockDetails/balanceSheet",
  async (sybmol) => {
    try {
      const res = await getBalanceSheet(sybmol);
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const getStockSuggestionThunk = createAsyncThunk(
  "stockDetails/suggestion",
  async (symbol) => {
    try {
      let res = await getStockSuggestion(symbol);
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const getStockHistoricalDataThunk = createAsyncThunk(
  "stockDetails/historicalData",
  async ({ symbol, period, interval }) => {
    try {
      let res = await getStockHistoricalData(symbol, period, interval);
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const getStockInfoThunk = createAsyncThunk(
  "stockDetails/info",
  async (symbol) => {
    try {
      let res = await getStockInfo(symbol);
      return res;
    } catch (err) {
      return err?.response?.data;
    }
  }
);

export const getFinancialRatiosThunk = createAsyncThunk(
  "stockDetails/financial",
  async (symbol) => {
    try {
      let res = await getFinancialRatios(symbol);
      return res;
    } catch (err) {
      return err?.response?.data;
    }
  }
);

export const getAllStockDetailsThunk = createAsyncThunk(
  "stockDetails/getall",
  async (symbol) => {
    try {
      let res = await getAllStockDetails(symbol);
      return res;
    } catch (err) {
      return err?.response?.data;
    }
  }
);

const stockDetailsSlice = createSlice({
  name: "stockDetails",
  initialState,
  reducers: {
    clearStockDetails: () => initialState,
    clearHistoricalState: (state) => {
      state.historicalData = [];
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getStocksDetailsCurrentPriceThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getStocksDetailsCurrentPriceThunk.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.priceData = payload;
        }
      )
      .addCase(getStocksDetailsCurrentPriceThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getCashFlowThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCashFlowThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cashFlow = payload;
      })
      .addCase(getCashFlowThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getBalanceSheetThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalanceSheetThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.balanceSheet = payload;
      })
      .addCase(getBalanceSheetThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getRevenueStmtThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRevenueStmtThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.revenueStmt = payload;
      })
      .addCase(getRevenueStmtThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getStockSuggestionThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStockSuggestionThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.suggestion = payload;
      })
      .addCase(getStockSuggestionThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getStockHistoricalDataThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStockHistoricalDataThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.historicalData = payload;
      })
      .addCase(getStockHistoricalDataThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getStockInfoThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStockInfoThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.info = payload;
      })
      .addCase(getStockInfoThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getFinancialRatiosThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFinancialRatiosThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.financial = payload;
      })
      .addCase(getFinancialRatiosThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getAllStockDetailsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStockDetailsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.revenueStmt = payload[0];
        state.balanceSheet = payload[1];
        state.cashFlow = payload[2];
        state.suggestion = payload[3];
        state.info = payload[4];
        state.priceData = payload[5];
        state.financial = payload[6];
      })
      .addCase(getAllStockDetailsThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearStockDetails, clearHistoricalState } =
  stockDetailsSlice.actions;

export default stockDetailsSlice.reducer;
