import axios from "axios";
import config from "../config";

let token = localStorage.getItem("token");

export const buyStock = async (data) => {
  let response = await axios.post(
    config.node_url + "/api/portfolio/stock/buy",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const buyMutualFund = async (data) => {
  let response = await axios.post(
    config.node_url + "/api/portfolio/mutual-funds/buy",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const buyETF = async (data) => {
  let response = await axios.post(
    config.node_url + "/api/portfolio/etf/buy",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const sellStocks = async (data) => {
  let response = await axios.post(
    config.node_url + "/api/portfolio/stock/sell",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const sellMFs = async (data) => {
  let response = await axios.post(
    config.node_url + "/api/portfolio/mutual-fund/sell",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const sellETFs = async (data) => {
  let response = await axios.post(
    config.node_url + "/api/portfolio/etf/sell",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getStockPortfolio = async () => {
  let response = await axios.get(
    config.node_url + "/api/portfolio/all/stocks/portfolio",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMutualFundPortfolio = async () => {
  let response = await axios.get(
    config.node_url + "/api/portfolio/all/mfs/portfolio",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getETFPortfolio = async () => {
  let response = await axios.get(
    config.node_url + "/api/portfolio/all/etfs/portfolio",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getTotalInvestment = async () => {
  let response = await axios.get(
    config.node_url + "/api/portfolio/total/investment",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getTotalProit = async () => {
  let response = await axios.get(
    config.node_url + "/api/portfolio/total/profit",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const sipMFInvest = async (symbol, id) => {
  let response = await axios.get(
    config.node_url + `/api/portfolio/sip/buy/${symbol}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
