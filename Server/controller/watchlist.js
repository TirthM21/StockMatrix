import Watchlist from "../model/Watchlist.js";
import axios from "axios";
import config from "../config.js";

// Add to Watchlist
export const addWatchlist = async (req, res) => {
  let success = false;
  try {
    // stocks, mutual_funds, etfs
    const { name, symbol, type } = req.body;

    let watchlist = await Watchlist.findOne({ user_id: req.user.id });

    if (!watchlist) {
      watchlist = await Watchlist.create({
        user_id: req.user.id,
        [type]: [
          {
            name,
            symbol,
          },
        ],
      });
    } else {
      watchlist = await Watchlist.findOneAndUpdate(
        { user_id: req.user.id },
        {
          $push: {
            [type]: {
              name,
              symbol,
            },
          },
        }
      );
    }

    success = true;
    return res.status(200).send({
      success,
      message: "Added to Watchlist.",
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

export const getStockWatchlist = async (req, res) => {
  let success = false;

  try {
    const allWatchlists = await Watchlist.findOne({ user_id: req.user.id });

    if (!allWatchlists || !allWatchlists.stocks) {
      return res.status(200).send({
        success: false,
        message: "No stocks in the watchlist.",
      });
    }

    let stocksData = [];

    for (const s of allWatchlists.stocks) {
      let data = await axios.get(
        config.stock_api + "/stock/currentprice/" + s.symbol
      );

      stocksData.push({
        ...data.data,
        id: s._id,
      });
    }

    success = true;
    return res.status(200).send({
      success,
      stocksData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};


// Mutual Fund
export const getMFWatchlist = async (req, res) => {
  let success = false;

  try {
    const allWatchlists = await Watchlist.findOne({ user_id: req.user.id });

    const mutualFunds = allWatchlists.mutual_funds;

    // console.log(mutualFunds);

    let mutualFundsData = [];

    for (let mf of mutualFunds) {
      let data = await axios.get(
        config.stock_api + "/mutualfund/current/price/" + mf.symbol.split(".")[0]
      );
      mutualFundsData.push({
        ...data.data,
        id: mf._id,
      });
    }

    return res.status(200).send({
      success,
      mutualFundsData,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// ETF
export const getETFWatchlist = async (req, res) => {
  let success = false;

  try {
    const allWatchlists = await Watchlist.findOne({ user_id: req.user.id });

    const etfs = allWatchlists.etfs;

    let etfsData = [];

    for (let etf of etfs) {
      let data = await axios.get(
        config.stock_api + "/etf/current/price/" + etf.symbol
      );
      etfsData.push({
        ...data.data,
        id: etf._id,
      });
    }

    return res.status(200).send({
      success,
      etfsData,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Remove from Watchlist
export const removeWatchlist = async (req, res) => {
  let success = false;

  try {
    // stocks, mutual_funds, etfs
    const { type, id } = req.params;

    let watchlist = "";

    if (type === "stocks") {
      watchlist = await Watchlist.findOne(
        {
          user_id: req.user.id,
          "stocks._id": id,
        },
        {
          "stocks.$": 1,
        }
      );
    }

    if (type === "mutual_funds") {
      watchlist = await Watchlist.findOne(
        {
          user_id: req.user.id,
          "mutual_funds._id": id,
        },
        {
          "mutual_funds.$": 1,
        }
      );
    }

    if (type === "etfs") {
      watchlist = await Watchlist.findOne(
        {
          user_id: req.user.id,
          "etfs._id": id,
        },
        {
          "etfs.$": 1,
        }
      );
    }

    if (!watchlist) {
      return res.status(404).send({
        success,
        message: "Ticker not found.",
      });
    }

    watchlist = await Watchlist.findOneAndUpdate(
      { user_id: req.user.id },
      {
        $pull: { [type]: { _id: id } },
      }
    );

    success = true;

    return res.status(200).send({
      success,
      message: `${type} deleted from Watchlist.`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};
