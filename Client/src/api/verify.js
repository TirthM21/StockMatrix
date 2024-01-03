import axios from "axios";
import config from "../config";

export const verifyLogin = async (token) => {
  const response = await axios.post(
    config.node_url + `/api/verify/login/${token}`,
  );

  return response.data;
};

