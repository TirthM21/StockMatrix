import { Router } from "express";
import checkuser from "../middleware/checkuser.js";
import {
  addWithdraw,
  getAllWithdraws,
  getWithdrawGraph,
} from "../controller/withdraw.js";
import checkKyc from "../middleware/checkKYC.js";

export const withdrawRouter = Router();

withdrawRouter.post("/add", checkuser, checkKyc, addWithdraw);

withdrawRouter.get("/all", checkuser, checkKyc, getAllWithdraws);

withdrawRouter.get("/graph", checkuser, checkKyc, getWithdrawGraph);
