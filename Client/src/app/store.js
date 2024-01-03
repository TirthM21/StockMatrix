import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/auth";
import nominateReducer from "../features/user/nominate";
import infoReducer from "../features/user/info";
import verifyLoginReducer from "../features/verify/verifyLogin";
import sendLoginEmailReducer from "../features/email/sendLoginEmail";
import stockBSEReducer from "../features/stocks/allBSEStocks";
import stockNSEReducer from "../features/stocks/allNSEStocks";
import stockIndexesReducer from "../features/stocks/stockIndexes";
import stockTopReducer from "../features/stocks/stocksTop";
import bestMFReducer from "../features/mutualfunds/bestMF";
import bestETFReducer from "../features/etfs/bestETF";
import kycReducer from "../features/kyc/kyc";
import allMutualFundsReducer from "../features/mutualfunds/allMutualFunds";
import allEtfsReducer from "../features/etfs/allEtfs";
import updateDataReducer from "../features/user/updateData";
import stockCurrentPriceReducer from "../features/stocks/currentPrice";
import stockDetailsReducer from "../features/stocks/stockDetails";
import companyMFReducer from "../features/mutualfunds/companyMF";
import mfDetailsReducer from "../features/mutualfunds/mfDetails";
import getTransactionReducer from "../features/transaction/getTransaction";
import addTransactionReducer from "../features/transaction/addTransaction";
import walletReducer from "../features/transaction/wallet";
import mfTransactionReducer from "../features/portfolio/mfTransaction";
import portfolioReducer from "../features/portfolio/portfolio";
import etfTransactionReducer from "../features/portfolio/etfTransaction";

import stockTransactionReducer from "../features/portfolio/stockTransaction";
import notificationReducer from "../features/notification";
import getWatchlistReducer from "../features/watchlist/getWatchlist";
import watchlistReducer from "../features/watchlist/watchlist";

import etfDetailsReducer from "../features/etfs/etfDetails";
import depositWithdrawReducer from "../features/graph/depositWithdraw";

import investmentDetailsReducer from "../features/portfolio/investmentDetails";

import searchTickerReducer from "../features/searchTicker";

const reducers = combineReducers({
  authReducer,
  nominateReducer,
  infoReducer,
  verifyLoginReducer,
  sendLoginEmailReducer,
  stockTopReducer,
  stockBSEReducer,
  stockNSEReducer,
  stockIndexesReducer,
  bestMFReducer,
  bestETFReducer,
  kycReducer,
  allMutualFundsReducer,
  allEtfsReducer,
  updateDataReducer,
  stockCurrentPriceReducer,
  stockDetailsReducer,
  companyMFReducer,
  mfDetailsReducer,
  getTransactionReducer,
  addTransactionReducer,
  walletReducer,
  stockTransactionReducer,
  mfTransactionReducer,
  portfolioReducer,
  notificationReducer,
  getWatchlistReducer,
  watchlistReducer,
  depositWithdrawReducer,
  etfDetailsReducer,
  investmentDetailsReducer,
  searchTickerReducer,
  etfTransactionReducer,
});

const store = configureStore({
  reducer: reducers,
});

export default store;
