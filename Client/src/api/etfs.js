import axios from "axios";

export const getAllEtfs = async (skip, limit) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API + `all/etfs?skip=${skip}&limit=${limit}`
  );

  return response.data;
};

export const getBestEtf = async (type) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API +
      `etf/best-${type}-etf`
  );

  return response.data;
};

export const getCurrentPriceEtf = async (symbol) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API + `etf/current/price/${symbol}`
  );

  return response.data;
};

export const getDetailsEtf = async (symbol) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API + `etf/details/${symbol}`
  );

  return response.data;
};

export const getHistoricalDataEtf = async (symbol, period, interval) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API +
      `etf/historical-data/${symbol}?period=${period}&interval=${interval}`
  );

  return response.data;
};
