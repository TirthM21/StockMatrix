import { Router } from "express";
import checkuser from "../middleware/checkuser.js";
import { getWallet } from "../controller/wallet.js";

export const walletRouter = Router();

walletRouter.get("/", checkuser, getWallet);
