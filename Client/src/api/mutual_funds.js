import axios from "axios";

export const getAllMutualFund = async (skip, limit) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API +
      `mutualfund/all?skip=${skip}&limit=${limit}`
  );
  return response.data;
};

// ------------------------------------------ Category --------------------------------------------

export const getCompanyFunds = async (company, skip, limit) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API +
      `mutualfund/${company}?skip=${skip}&limit=${limit}`
  );
  return response.data;
};

// ----------------------------------- Best Funds --------------------------------------------------

export const getAllBestDebtFunds = async (skip, limit) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API +
      `mutualfund/best-debt?skip=${skip}&limit=${limit}`
  );
  return response.data;
};

export const getAllBestLongTermFunds = async (skip, limit) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API +
      `mutualfund/best-long-duration?skip=${skip}&limit=${limit}`
  );
  return response.data;
};

export const getAllBestReturnsFunds = async (skip, limit) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API +
      `mutualfund/best-returns?skip=${skip}&limit=${limit}`
  );
  return response.data;
};

export const getAllBestEquityFunds = async (skip, limit) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API +
      `mutualfund/best-equity?skip=${skip}&limit=${limit}`
  );
  return response.data;
};

export const getAllBestTaxSaverFunds = async (skip, limit) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API +
      `mutualfund/best-tax-saver?skip=${skip}&limit=${limit}`
  );
  return response.data;
};

// ------------------------------------ Mutual Funds ----------------------------------
export const getHistoryFunds = async (symbol, period, interval) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API +
      `mutualfund/history/${symbol}?period=${period}&interval=${interval}`
  );
  return response.data;
};

export const getDetailsFunds = async (symbol) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API + `mutualfund/details/${symbol}`
  );
  return response.data;
};

export const getCurrentPriceFunds = async (symbol) => {
  const response = await axios.get(
    process.env.REACT_APP_STOCK_API + `mutualfund/current/price/${symbol}`
  );
  return response.data;
};
