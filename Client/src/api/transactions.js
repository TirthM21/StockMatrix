import axios from "axios";
import config from "../config";

let token = localStorage.getItem("token");

export const getAllDeposit = async () => {
  let response = await axios.get(config.node_url + "/api/deposit/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addDeposit = async (data) => {
  let response = await axios.post(config.node_url + "/api/deposit/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllWithdraws = async () => {
  let response = await axios.get(config.node_url + "/api/withdraw/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
};

export const addWithdraw = async (data) => {
  let response = await axios.post(config.node_url + "/api/withdraw/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
};

export const getWallet = async () => {
  let response = await axios.get(config.node_url + "/api/wallet", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data;
};
