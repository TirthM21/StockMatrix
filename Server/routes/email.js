import express from "express";
import { sendEmailLogin } from "../controller/email.js";

export const emailRouter = express.Router();

emailRouter.post("/verifylogin/:id", sendEmailLogin);
