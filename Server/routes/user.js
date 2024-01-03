import { Router } from "express";
import {
  addUserNomination,
  changePassword,
  deleteUserNominate,
  getSingleUserNominate,
  getUser,
  updateBankDetails,
  updateUser,
  updateUserInfo,
  updateUserNominate,
  userInfo,
  userLogin,
  userRegister,
} from "../controller/user.js";
import checkuser from "../middleware/checkuser.js";

export const userRouter = Router();

userRouter.post("/register", userRegister); //

userRouter.post("/info", userInfo); //

userRouter.post("/nominate", addUserNomination); //

userRouter.post("/login", userLogin); //

userRouter.get("/", checkuser, getUser); //

userRouter.put("/update/userInfo", checkuser, updateUserInfo); //

userRouter.put("/update/user", checkuser, updateUser); //

userRouter.put("/update/userBank", checkuser, updateBankDetails); //

userRouter.put("/changepassword", checkuser, changePassword); //

userRouter.get("/nominate", checkuser, getSingleUserNominate); //

userRouter.put("/update/nominate/:id", checkuser, updateUserNominate); //

userRouter.delete("/delete/nominate/:id", checkuser, deleteUserNominate); //
