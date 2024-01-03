import { Router } from "express";
import checkuser from "../middleware/checkuser.js";
import {
  etfBuyTicker,
  getETFPortfolio,
  getMFPortfolio,
  getStockPortfolio,
  getTotalInvestment,
  getTotalProfit,
  mutualFundBuyTicker,
  sellEtfTicker,
  sellMutualFundsTicker,
  sellStocksTicker,
  stockBuyTicker,
} from "../controller/portfolio.js";
import checkKyc from "../middleware/checkKYC.js";

export const portfolioRouter = Router();

portfolioRouter.post("/stock/buy", checkuser, checkKyc, stockBuyTicker);

portfolioRouter.post(
  "/mutual-funds/buy",
  checkuser,
  checkKyc,
  mutualFundBuyTicker
);

portfolioRouter.post("/etf/buy", checkuser, checkKyc, etfBuyTicker);

portfolioRouter.post("/stock/sell", checkuser, checkKyc, sellStocksTicker);

portfolioRouter.post(
  "/mutual-fund/sell",
  checkuser,
  checkKyc,
  sellMutualFundsTicker
);

portfolioRouter.post("/etf/sell", checkuser, checkKyc, sellEtfTicker);

portfolioRouter.get(
  "/all/stocks/portfolio",
  checkuser,
  checkKyc,
  getStockPortfolio
);

portfolioRouter.get("/all/mfs/portfolio", checkuser, checkKyc, getMFPortfolio);

portfolioRouter.get(
  "/all/etfs/portfolio",
  checkuser,
  checkKyc,
  getETFPortfolio
);

portfolioRouter.get(
  "/total/investment",
  checkuser,
  checkKyc,
  getTotalInvestment
);

portfolioRouter.get(
  "/total/profit",
  checkuser,
  checkKyc,
  getTotalProfit
);
