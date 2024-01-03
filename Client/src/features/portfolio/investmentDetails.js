import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTotalInvestment, getTotalProit } from "../../api/portfolio";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isSuccess: false,
  investment: "",
  profit: "",
};

export const getTotalInvestmentThunk = createAsyncThunk(
  "investmentDetails/investment",
  async () => {
    try {
      let res = await getTotalInvestment();
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

export const getTotalProfitThunk = createAsyncThunk(
  "investmentDetails/profit",
  async () => {
    try {
      let res = await getTotalProit();
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

const investmentDetailsSlice = createSlice({
  name: "investmentDetails",
  initialState,
  reducers: {
    clearInvestmentDetailsState: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(getTotalInvestmentThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalInvestmentThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investment = payload.total_investment;
      })
      .addCase(getTotalInvestmentThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getTotalProfitThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalProfitThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profit = payload.total_profit;
      })
      .addCase(getTotalProfitThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearInvestmentDetailsState } = investmentDetailsSlice.actions;

export default investmentDetailsSlice.reducer;
