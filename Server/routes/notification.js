import { Router } from "express";
import checkUser from "../middleware/checkuser.js";
import { investSIPNotification } from "../controller/notification.js";

export const notificationRouter = Router();

notificationRouter.get("/sip/investment", checkUser, investSIPNotification);
