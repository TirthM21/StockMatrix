import axios from "axios";
import config from "../config";

export const sendEmailLoginVerify = async (id) => {
  const response = await axios.post(
    config.node_url + `/api/email/verifylogin/${id}`
  );
  return response.data;
};
