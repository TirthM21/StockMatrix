import express from "express";
import checkuser from "../middleware/checkuser.js";
import { getAllProfitEarned, getAllSoldTicker } from "../controller/soldticker.js";
import checkKyc from "../middleware/checkKYC.js";

export const soldTickerRouter = express.Router();

soldTickerRouter.get("/soldticker", checkuser, checkKyc, getAllSoldTicker);

soldTickerRouter.get("/total/profit", checkuser, checkKyc, getAllProfitEarned);