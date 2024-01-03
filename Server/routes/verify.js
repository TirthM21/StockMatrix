import express from "express";
import { verifyToLogin } from "../controller/verify.js";

export const verifyRouter = express.Router();

verifyRouter.post("/login/:token", verifyToLogin);