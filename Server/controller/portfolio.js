import axios from "axios";
import Portfolio from "../model/Portfolio.js";
import SoldTicker from "../model/SoldTicker.js";
import Wallet from "../model/Wallet.js";
import config from "../config.js";
import { pow } from "mathjs";

// Stock Buy ---------------------------------------------------------------------------
export const stockBuyTicker = async (req, res) => {
  let success = false;
  try {
    const { name, symbol, buy_price, no_of_shares } = req.body;

    let portfolio = await Portfolio.findOne({ user_id: req.user.id });

    let wallet = await Wallet.findOne({ user_id: req.user.id });

    if (wallet.balance < buy_price * no_of_shares) {
      return res.status(400).send({
        success,
        message: "Not Enough Funds in the Wallet.",
      });
    }

    wallet = await Wallet.findOneAndUpdate(
      { user_id: req.user.id },
      {
        $inc: {
          balance: -(buy_price * no_of_shares),
        },
      }
    );

    let date = new Date();

    if (!portfolio) {
      portfolio = await Portfolio.create({
        user_id: req.user.id,
        stocks: [
          {
            name,
            symbol,
            no_of_shares,
            buy_price,
            date_of_buy: date,
          },
        ],
        total_investment: buy_price * no_of_shares,
      });
    } else {
      portfolio = await Portfolio.findOneAndUpdate(
        { user_id: req.user.id },
        {
          $push: {
            stocks: {
              name,
              symbol,
              no_of_shares,
              buy_price,
              date_of_buy: date,
            },
          },
          $inc: {
            total_investment: buy_price * no_of_shares,
          },
        }
      );
    }

    success = true;

    return res.status(200).send({
      success,
      message: `Stock bought successfully`,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Mutual Funds Buy ---------------------------------------------------------------------------
export const mutualFundBuyTicker = async (req, res) => {
  console.log(req.body)
  let success = false;
  try {
    const {
      name,
      symbol,
      buy_price,
      investment,
      type_mf,
      total_years,
      one_year_return,
      year_sell,
    } = req.body;

    // Check for valid investment and buy_price values
    if (isNaN(investment) || isNaN(buy_price) || buy_price <= 0) {
      return res.status(400).send({
        success,
        message: "Invalid investment or buy_price values.",
      });
    }

    let portfolio = await Portfolio.findOne({ user_id: req.user.id });

    let wallet = await Wallet.findOne({ user_id: req.user.id });

    if (wallet.balance < investment) {
      return res.status(400).send({
        success,
        message: "Not Enough Funds in the Wallet.",
      });
    }

    let realInvestment = Math.floor(investment / buy_price) * buy_price;

    wallet = await Wallet.findOneAndUpdate(
      { user_id: req.user.id },
      {
        $inc: {
          balance: -realInvestment,
        },
      }
    );

    if (!portfolio) {
      portfolio = await Portfolio.create({
        user_id: req.user.id,
        mutual_funds: [
          {
            name,
            symbol,
            type_mf,
            buy_price,
            one_year_return,
            no_of_units: realInvestment / buy_price,
            total_price:
              type_mf === 1
                ? realInvestment * total_years * 12
                : realInvestment,
            remaining_price:
              type_mf === 1
                ? realInvestment * total_years * 12 - realInvestment
                : 0,
            date_of_buy: new Date(),
            total_years,
            year_sell,
          },
        ],
        total_investment: realInvestment,
      });
    } else {
      portfolio = await Portfolio.findOneAndUpdate(
        { user_id: req.user.id },
        {
          $push: {
            mutual_funds: {
              name,
              symbol,
              type_mf,
              total_price:
                type_mf === 1
                  ? realInvestment * total_years * 12
                  : realInvestment,
              remaining_price:
                type_mf === 1
                  ? realInvestment * total_years * 12 - realInvestment
                  : 0,
              buy_price,
              one_year_return,
              no_of_units: realInvestment / buy_price,
              date_of_buy: new Date(),
              total_years,
              year_sell,
            },
          },
          $inc: {
            total_investment: realInvestment,
          },
        }
      );
    }

    success = true;

    return res.status(200).send({
      success,
      message: `Mutual Fund bought successfully`,
    });
  } catch (err) {
    console.error("Error in mutualFundBuyTicker:", err);
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
      error: err.message, // Include the error message
    });
  }
};

// Buy ETF -----------------------------------------------------------------------------------
export const etfBuyTicker = async (req, res) => {
  let success = false;
  try {
    const { name, symbol, buy_price, no_of_shares } = req.body;

    let portfolio = await Portfolio.findOne({ user_id: req.user.id });

    let wallet = await Wallet.findOne({ user_id: req.user.id });

    if (wallet.balance < buy_price * no_of_shares) {
      return res.status(400).send({
        success,
        message: "Not Enough Funds in the Wallet.",
      });
    }

    wallet = await Wallet.findOneAndUpdate(
      { user_id: req.user.id },
      {
        $inc: {
          balance: -(buy_price * no_of_shares),
        },
      }
    );

    if (!portfolio) {
      portfolio = await Portfolio.create({
        user_id: req.user.id,
        etfs: [
          {
            name,
            symbol,
            buy_price,
            date_of_buy: new Date(),
            no_of_shares,
          },
        ],
        total_investment: buy_price * no_of_shares,
      });
    } else {
      portfolio = await Portfolio.findOneAndUpdate(
        { user_id: req.user.id },
        {
          $push: {
            etfs: {
              name,
              symbol,
              buy_price,
              date_of_buy: new Date(),
              no_of_shares,
            },
          },
          $inc: {
            total_investment: buy_price * no_of_shares,
          },
        }
      );
    }

    success = true;

    return res.status(200).send({
      success,
      message: `ETF bought successfully`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Stocks Sell and remove from Portfolio ---------------------------------------------------------------------------
export const sellStocksTicker = async (req, res) => {
  let success = false;

  try {
    const {
      name,
      symbol,
      buy_price,
      sell_price,
      no_of_shares,
      profit,
      stocks_id,
    } = req.body;

    let portfolio = await Portfolio.findOne(
      {
        user_id: req.user.id,
        "stocks._id": stocks_id,
      },
      {
        "stocks.$": 1,
      }
    );

    const currStock = portfolio.stocks[0];

    if (currStock.no_of_shares < no_of_shares) {
      return res.status(400).send({
        success,
        message:
          "Not Allowed! Quantity of selling is higher than Current total shares.",
      });
    }

    if (currStock.no_of_shares > no_of_shares) {
      await Portfolio.findOneAndUpdate(
        {
          user_id: req.user.id,
          "stocks._id": stocks_id,
        },
        {
          $inc: {
            "stocks.$.no_of_shares": -no_of_shares,
            total_profit: profit,
          },
        }
      );
    }

    if (currStock?.no_of_shares === no_of_shares) {
      await Portfolio.findOneAndUpdate(
        { user_id: req.user.id },
        {
          $pull: {
            stocks: {
              _id: stocks_id,
            },
          },
          $inc: {
            total_profit: profit,
          },
        }
      );
    }

    let soldTicker = await SoldTicker.findOne({ user_id: req.user.id });

    if (!soldTicker) {
      soldTicker = await SoldTicker.create({
        user_id: req.user.id,
        stocks: [
          {
            name,
            symbol,
            buy_price,
            sell_price,
            no_of_shares,
            date_of_buy: currStock.date_of_buy,
            date_of_sell: new Date(),
            profit,
          },
        ],
      });
    } else {
      soldTicker = await SoldTicker.findOneAndUpdate(
        { user_id: req.user.id },
        {
          $push: {
            stocks: {
              name,
              symbol,
              buy_price,
              sell_price,
              no_of_shares,
              date_of_buy: currStock.date_of_buy,
              date_of_sell: new Date(),
              profit,
            },
          },
        }
      );
    }

    await Wallet.findOneAndUpdate(
      { user_id: req.user.id },
      {
        $inc: {
          balance: sell_price * no_of_shares,
        },
      }
    );

    success = true;

    return res.status(200).send({
      success,
      message: `${name} successfully Sold.`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Mutual Funds Sell and remove from Portfolio ---------------------------------------------------------------------------
export const sellMutualFundsTicker = async (req, res) => {
  let success = false;

  try {
    const { name, symbol, mf_id, profit } = req.body;

    let portfolio = await Portfolio.findOne(
      { user_id: req.user.id, "mutual_funds._id": mf_id },
      {
        "mutual_funds.$": 1,
      }
    );

    let mutualFund = portfolio.mutual_funds[0];

    const buy_date = new Date(mutualFund?.date_of_buy);
    const date = new Date();
    const sell_date = new Date(
      `${mutualFund.year_sell}-${buy_date.getMonth()}-${buy_date?.getDate()}`
    );

    if (sell_date.getTime() >= date.getTime()) {
      return res.status(405).send({
        success,
        message: `Mutual Fund is not mature yet. You can sell it after ${sell_date.toLocaleDateString()}`,
      });
    }

    portfolio = await Portfolio.findOneAndUpdate(
      { user_id: req.user.id },
      {
        $pull: {
          mutual_funds: {
            _id: mf_id,
          },
        },
      },
      {
        $inc: {
          total_profit: profit,
        },
      }
    );

    let soldTicker = await SoldTicker.findOne({ user_id: req.user.id });

    if (!soldTicker) {
      soldTicker = await SoldTicker.create({
        user_id: req.user.id,
        mutual_funds: [
          {
            name,
            symbol,
            buy_price: mutualFund.buy_price,
            type_mf: mutualFund.type_mf,
            date_of_buy: mutualFund.date_of_buy,
            no_of_units: mutualFund.no_of_units,
            total_years: mutualFund.total_years,
            year_sell: mutualFund.year_sell,
            date_of_sell: new Date(),
            profit,
          },
        ],
      });
    } else {
      soldTicker = await SoldTicker.findOneAndUpdate(
        { user_id: req.user.id },
        {
          $push: {
            mutual_funds: {
              name,
              symbol,
              buy_price: mutualFund.buy_price,
              type_mf: mutualFund.type_mf,
              date_of_buy: mutualFund.date_of_buy,
              no_of_units: mutualFund.no_of_units,
              total_years: mutualFund.total_years,
              year_sell: mutualFund.year_sell,
              date_of_sell: new Date(),
              profit,
            },
          },
        }
      );
    }

    let wallet = await Wallet.findOneAndUpdate(
      { user_id: req.user.id },
      {
        $inc: {
          balance: sell_price * no_of_shares,
        },
      }
    );

    success = true;

    return res.status(200).send({
      success,
      message: `${name} successfully Sold.`,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// ETF Sell and remove from Portfolio ---------------------------------------------------------------------------
export const sellEtfTicker = async (req, res) => {
  let success = false;

  try {
    const { name, symbol, sell_price, profit, etf_id, no_of_shares } = req.body;

    let portfolio = await Portfolio.findOne(
      {
        user_id: req.user.id,
        "etfs._id": etf_id,
      },
      {
        "etfs.$": 1,
      }
    );

    let etf = portfolio.etfs[0];

    if (etf.no_of_shares < no_of_shares) {
      return res.status(400).send({
        success,
        message:
          "Not Allowed! Quantity of selling is higher than Current total shares.",
      });
    }

    if (no_of_shares === etf.no_of_shares) {
      portfolio = await Portfolio.findOneAndUpdate(
        { user_id: req.user.id },
        {
          $pull: {
            etfs: {
              _id: etf_id,
            },
          },
        },
        {
          $inc: {
            total_profit: profit,
          },
        }
      );
    }

    if (etf.no_of_shares > no_of_shares) {
      portfolio = await Portfolio.findOneAndUpdate(
        { user_id: req.user.id, "etfs._id": etf_id },
        {
          $inc: {
            "etfs.$.no_of_shares": -no_of_shares,
            total_profit: profit,
          },
        }
      );
    }

    let soldTicker = await SoldTicker.findOne({ user_id: req.user.id });

    if (!soldTicker) {
      soldTicker = await SoldTicker.create({
        user_id: req.user.id,
        etfs: [
          {
            name,
            symbol,
            no_of_shares,
            buy_price: etf.buy_price,
            date_of_buy: etf.date_of_buy,
            sell_price,
            date_of_sell: new Date(),
            profit,
          },
        ],
      });
    } else {
      soldTicker = await SoldTicker.findOneAndUpdate(
        { user_id: req.user.id },
        {
          $push: {
            etfs: {
              name,
              symbol,
              no_of_shares,
              buy_price: etf.buy_price,
              date_of_buy: etf.date_of_buy,
              sell_price,
              date_of_sell: new Date(),
              profit,
            },
          },
        }
      );
    }

    let wallet = await Wallet.findOneAndUpdate(
      { user_id: req.user.id },
      {
        $inc: {
          balance: sell_price * no_of_shares,
        },
      }
    );

    success = true;

    return res.status(200).send({
      success,
      message: `${name} successfully Sold.`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Get Stock Portfolio
export const getStockPortfolio = async (req, res) => {
  let success = false;

  try {
    let portfolio = await Portfolio.findOne({ user_id: req.user.id });

    let stocksData = [];

    for (const stock of portfolio?.stocks) {
      if (!portfolio) {
        return res.status(200).send({
          success,
          stocksPortfolio: stocksData,
        });
      }

      let currStock = await axios.get(
        config.stock_api + "/stock/currentprice/" + stock.symbol
      );

      stocksData.push({
        _id: stock._id,
        name: stock.name,
        symbol: stock.symbol,
        buy_price: stock.buy_price,
        curr_price: currStock?.data.curr_price,
        profit:
          (currStock?.data.curr_price - stock.buy_price) * stock.no_of_shares,
        total_price: stock.buy_price * stock.no_of_shares,
        quantity: stock.no_of_shares,
        date_of_buy: stock.date_of_buy,
      });
    }

    success = true;

    return res.status(200).send({
      success,
      stocksPortfolio: stocksData,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Get Mutual Fund Portfolio
export const getMFPortfolio = async (req, res) => {
  let success = false;

  try {
    let portfolio = await Portfolio.findOne({ user_id: req.user.id });

    if (!portfolio) {
      return res.status(200).send({
        success,
        lumpsumMF,
        sipMF,
      });
    }

    let lumpsumMF = [];
    let sipMF = [];

    for (const mf of portfolio?.mutual_funds) {
      if (mf.type_mf === 0) {
        const profit =
          mf.buy_price *
          mf.no_of_units *
          pow(1 + mf.one_year_return / (1 * 100), mf.total_years * 1);
        lumpsumMF.push({
          _id: mf._id,
          name: mf.name,
          symbol: mf.symbol,
          total_years: mf.total_years,
          buy_price: mf.buy_price,
          total_investment: mf.total_price,
          expected_net_profit: profit,
          expected_interest_earned: profit - mf.total_price,
          year_sell: mf.year_sell,
          date_of_buy: mf.date_of_buy,
        });
      } else {
        const monthlyReturn = mf.one_year_return / 100 / 12;
        const profit =
          mf.buy_price *
          mf.no_of_units *
          ((pow(1 + monthlyReturn, mf.total_years * 12) - 1) / monthlyReturn) *
          (1 + monthlyReturn);

        sipMF.push({
          _id: mf._id,
          name: mf.name,
          symbol: mf.symbol,
          total_years: mf.total_years,
          buy_price: mf.buy_price,
          no_of_units: mf.no_of_units,
          one_year_return: mf.one_year_return,
          expected_net_profit: profit,
          expected_interest_earned: profit - mf.total_price,
          year_sell: mf.year_sell,
          date_of_buy: mf.date_of_buy,
        });
      }
    }

    success = true;

    return res.status(200).send({
      success,
      lumpsumMF,
      sipMF,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Get ETF Portfolio
export const getETFPortfolio = async (req, res) => {
  let success = false;

  try {
    let portfolio = await Portfolio.findOne({ user_id: req.user.id });

    let etfData = [];

    if (!portfolio) {
      return res.status(200).send({
        success,
        etfPortfolio: etfData,
      });
    }

    for (const etf of portfolio?.etfs) {
      let currEtf = await axios.get(
        config.stock_api + "/etf/current/price/" + etf.symbol
      );

      etfData.push({
        id: etf._id,
        name: etf.name,
        symbol: etf.symbol,
        curr_price: currEtf?.data?.curr_price,
        buy_price: etf.buy_price,
        profit: (currEtf?.data?.curr_price - etf.buy_price) * etf.no_of_shares,
        quantity: etf.no_of_shares,
        date_of_buy: etf.date_of_buy,
        total_price: etf.buy_price * etf.no_of_shares,
      });
    }

    success = true;

    return res.status(200).send({
      success,
      etfPortfolio: etfData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Get Total Investment
export const getTotalInvestment = async (req, res) => {
  let success = false;
  try {
    let portfolio = await Portfolio.findOne({ user_id: req.user.id });

    if (!portfolio) {
      return res.status(200).send({
        success,
        total_investment: 0,
      });
    }

    success = true;

    return res.status(200).send({
      success,
      total_investment: portfolio.total_investment,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Get Total Investment
export const getTotalProfit = async (req, res) => {
  let success = false;
  try {
    let portfolio = await Portfolio.findOne({ user_id: req.user.id });

    if (!portfolio) {
      return res.status(200).send({
        success,
        total_profit: 0,
      });
    }

    success = true;

    return res.status(200).send({
      success,
      total_profit: portfolio.total_profit,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Get Total Profit

// Update and get Total Portfolio Amount ---------------------------------------------------------------------------
export const getProfit = async (req, res) => {
  let success = false;

  try {
    let portfolio = await Portfolio.findOne({ user_id: req.user.id });

    let date = new Date().toLocaleDateString().split("/");

    let curr = new Date().getTime();
    let later = new Date(
      `${date[2]}-0${date[1]}-0${date[0]} 15:35:00`
    ).getTime();

    let profit = 0;
    let portfolioData = portfolio.portfolio;

    if (curr > later) {
      for (let p in portfolioData) {
        let currPrice = 0;
        if (p.type === "Stock") {
          currPrice = await axios.get(
            config.stock_api + "/stock/currentprice" + p.symbol
          );
        }
        if (p.type === "Mutual Fund") {
          currPrice = await axios.get(
            config.stock_api + "/mutualfund/current/price/" + p.symbol
          );
        }
        if (p.type === "ETF") {
          currPrice = await axios.get(
            config.stock_api + "/etf/current/price" + p.symbol
          );
        }

        profit += (currPrice - p.buy_price) * p.no_of_shares;
      }
      success = true;

      portfolio = await Portfolio.findOneAndUpdate(
        { user_id: req.user.id },
        {
          $set: {
            total_profit: profit,
          },
        }
      );
    }
    success = true;

    return res.status(200).send({
      success,
      profit: portfolio.total_profit,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

export const buySIPMFAgain = (req, res) => {
  let success = false;

  try {
  } catch (err) {}
};
