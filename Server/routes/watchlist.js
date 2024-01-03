import { Router } from "express";
import checkuser from "../middleware/checkuser.js";
import {
  addWatchlist,
  getETFWatchlist,
  getMFWatchlist,
  getStockWatchlist,
  removeWatchlist,
} from "../controller/watchlist.js";
import checkKyc from "../middleware/checkKYC.js";

export const watchlistRouter = Router();

watchlistRouter.post("/add", checkuser, checkKyc, addWatchlist);

watchlistRouter.get("/stocks/all", checkuser, checkKyc, getStockWatchlist);

watchlistRouter.get("/mutual-funds/all", checkuser, checkKyc, getMFWatchlist);

watchlistRouter.get("/etf/all", checkuser, checkKyc, getETFWatchlist);

watchlistRouter.post("/remove/:type/:id", checkuser, checkKyc, removeWatchlist);
