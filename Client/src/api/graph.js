import axios from "axios";
import config from "../config";

let token = localStorage.getItem("token");

export const getDepositGraph = async () => {
  let response = await axios.get(config.node_url + "/api/deposit/graph", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getWithdrawGraph = async () => {
  let response = await axios.get(config.node_url + "/api/withdraw/graph", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

