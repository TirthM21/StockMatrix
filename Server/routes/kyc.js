import express from "express";
import checkUser from "../middleware/checkuser.js";
import { addKyc, approveKyc, checkKYC } from "../controller/kyc.js";
export const kycRouter = express.Router();

kycRouter.post("/add", addKyc);

kycRouter.post("/approve", approveKyc);

kycRouter.get("/status", checkKYC);
