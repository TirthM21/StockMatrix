import axios from "axios";
import config from "../config";

let token = localStorage.getItem("token");

export const addToWatchlist = async (data) => {
  let response = await axios.post(
    config.node_url + "/api/watchlist/add",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const removeWatchlist = async (type, id) => {
  let response = await axios.post(
    config.node_url + `/api/watchlist/remove/${type}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getStocksWatchlist = async () => {
  let response = await axios.get(
    config.node_url + "/api/watchlist/stocks/all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getMFWatchlist = async () => {
  let response = await axios.get(
    config.node_url + "/api/watchlist/mutual-funds/all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getETFsWatchlist = async () => {
  let response = await axios.get(config.node_url + "/api/watchlist/etf/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
