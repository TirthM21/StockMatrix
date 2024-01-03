import express from "express";
import cors from "cors";
import { portfolioRouter } from "./routes/portfolio.js";
import { userRouter } from "./routes/user.js";
import { watchlistRouter } from "./routes/watchlist.js";
import { depositRouter } from "./routes/deposit.js";
import { withdrawRouter } from "./routes/withdraw.js";
import { soldTickerRouter } from "./routes/soldticker.js";
import config from "./config.js";
import connectToMongoDB from "./db.js";
import { emailRouter } from "./routes/email.js";
import { verifyRouter } from "./routes/verify.js";
import { kycRouter } from "./routes/kyc.js";
import { walletRouter } from "./routes/wallet.js";
import { notificationRouter } from "./routes/notification.js";

const app = express();
const port = config.port;

connectToMongoDB();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Welcome to the Investment Advisor API");
});

app.use(express.static("public"));

app.use("/api/user", userRouter);
app.use("/api/kyc", kycRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/watchlist", watchlistRouter);
app.use("/api/deposit", depositRouter);
app.use("/api/withdraw", withdrawRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/soldticker", soldTickerRouter);
app.use("/api/email", emailRouter);
app.use("/api/verify", verifyRouter);
app.use("/api/notification", notificationRouter);

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});
