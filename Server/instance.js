import axios from "axios";
import config from "./config.js";

const instance = axios.create({
  baseURL: config.stock_api,
  method: "GET",
});

export default instance;
