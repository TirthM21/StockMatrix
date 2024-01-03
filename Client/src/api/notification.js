import axios from "axios";
import config from "../config";

let token = localStorage.getItem("token");

export const getSIPNotification = async () => {
  let response = await axios.get(
    config.node_url + "/api/notification/sip/investment",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
