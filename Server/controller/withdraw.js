import mongoose from "mongoose";
import BankBalance from "../model/BankBalance.js";
import Wallet from "../model/Wallet.js";
import Withdraw from "../model/Withdraw.js";
import randomHash from "../utils/randomHash.js";

// Add Withdraw
export const addWithdraw = async (req, res) => {
  let success = false;

  try {
    const { amount } = req.body;

    let transaction_id = randomHash(14);

    let wallet = await Wallet.findOne({ user_id: req.user.id });

    if (wallet.balance < amount) {
      return res.status(400).send({
        success,
        message: "Not Enough funds in Wallet.",
      });
    }

    let withdraw = await Withdraw.create({
      amount,
      transaction_id,
      user_id: req.user.id,
    });

    await Wallet.findOneAndUpdate(
      { user_id: req.user.id },
      {
        $inc: { balance: -amount },
      }
    );

    await BankBalance.findOneAndUpdate(
      {
        user_id: req.user.id,
      },
      {
        $inc: { balance: amount },
      }
    );

    success = true;

    return res.status(200).send({
      success,
      message: "Deposit successful.",
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// All Withdraw
export const getAllWithdraws = async (req, res) => {
  let success = false;

  try {
    let withdraws = await Withdraw.find({ user_id: req.user.id });

    success = true;

    return res.status(200).send({
      success,
      withdraws,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

export const getWithdrawGraph = async (req, res) => {
  let success = false;

  try {
    let withdraws = await Withdraw.aggregate([
      {
        $match: { user_id: new mongoose.Types.ObjectId(req.user.id) },
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
            year: {
              $year: "$createdAt",
            },
          },
          total: { $sum: "$amount" },
        },
      },
    ]);

    success = true;
    return res.status(200).send({
      success,
      withdraws,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};
