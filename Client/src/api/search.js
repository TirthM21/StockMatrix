import axios from "axios";
import config from "../config";

export const searchStock = async (search) => {
  let response = await axios.get(config.stock_url + "stock?search=" + search);
  return response.data;
};

export const searchMF = async (search) => {
  let response = await axios.get(
    config.stock_url + "mutual-fund?search=" + search
  );
  return response.data;
};

export const searchETF = async (search) => {
  let response = await axios.get(config.stock_url + "etf?search=" + search);
  return response.data;
};
