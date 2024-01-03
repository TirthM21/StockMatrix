import { Router } from "express";
import checkuser from "../middleware/checkuser.js";
import {
  addDeposit,
  getAllDeposits,
  getDepositGraph,
} from "../controller/deposit.js";
import checkKyc from "../middleware/checkKYC.js";

export const depositRouter = Router();

depositRouter.post("/add", checkuser, checkKyc, addDeposit);

depositRouter.get("/all", checkuser, checkKyc, getAllDeposits);

depositRouter.get("/graph", checkuser, checkKyc, getDepositGraph);
