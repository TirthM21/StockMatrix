import axios from "axios";

export const getAllStocks = async (symbol, skip = 0, limit = 10) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API +
      `all/stocks/${symbol}?skip=${skip}&limit=${limit}`
  );
  return response.data;
};

export const getIndexes = async () => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API + `stock/index`
  );
  return response.data;
};

export const getTopStocks = async (skip = 0, limit = 4) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API + `top/stocks?skip=${skip}&limit=${limit}`
  );
  return response.data;
};

export const getCurrentPriceStocks = async (symbol) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API + `stock/currentprice/${symbol}`
  );
  return response.data;
};

// Details
export const getFinancialRatios = async (symbol) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API + `stock/financial/ratios/${symbol}`
  );
  return response.data;
};

export const getStockInfo = async (symbol) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API + `stock/info/${symbol}`
  );
  return response.data;
};

export const getBalanceSheet = async (symbol) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API + `stock/balancesheet/${symbol}`
  );
  return response.data;
};

export const getCashFlow = async (symbol) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API + `stock/cash/flow/${symbol}`
  );
  return response.data;
};

export const getRevenueStmt = async (symbol) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API + `stock/income/statement/${symbol}`
  );
  return response.data;
};

export const getStockSuggestion = async (symbol) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API + `stocks/suggestion/${symbol}`
  );
  return response.data;
};

export const getStockHistoricalData = async (symbol, period, interval) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API +
      `stock/historical/data/${symbol}?period=${period}&interval=${interval}`
  );
  return response.data;
};

export const getAllStockDetails = async (symbol) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API + `stock/details/all/${symbol}`
  );
  return response.data;
};
