import axios from "axios";
import config from "../config";

export const addKyc = async (data) => {
  console.log(data);
  const response = await axios.post(config.node_url + "/api/kyc/add", data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const approveKyc = async (data) => {
  const response = await axios.post(config.node_url + "/api/kyc/approve", data);
  return response.data;
};
