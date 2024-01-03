import mongoose from "mongoose";
import BankBalance from "../model/BankBalance.js";
import Deposit from "../model/Deposit.js";
import User from "../model/User.js";
import Wallet from "../model/Wallet.js";
import randomHash from "../utils/randomHash.js";

// Add Deposit
export const addDeposit = async (req, res) => {
  let success = false;

  try {
    const { amount } = req.body;

    let transaction_id = randomHash(14);

    let bankBalance = await BankBalance.findOne({
      user_id: req.user.id,
    });

    let user = await User.findOne({ _id: req.user.id });

    if (bankBalance.balance < amount) {
      return res.status(400).send({
        success,
        message: "Some Error Occured.",
      });
    }

    let deposit = await Deposit.create({
      amount,
      bank_account_number: user?.bank?.accountNumber,
      transaction_id,
      user_id: req.user.id,
    });

    let wallet = await Wallet.findOne({ user_id: req.user.id });

    if (!wallet) {
      await Wallet.create({
        user_id: req.user.id,
        balance: amount,
      });
    } else {
      await Wallet.findOneAndUpdate(
        { user_id: req.user.id },
        {
          $inc: { balance: amount },
        }
      );
    }

    await BankBalance.findOneAndUpdate(
      {
        user_id: req.user.id,
      },
      {
        $inc: { balance: -amount },
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

// All Deposit
export const getAllDeposits = async (req, res) => {
  let success = false;

  try {
    let deposits = await Deposit.find({ user_id: req.user.id });

    success = true;

    return res.status(200).send({
      success,
      deposits,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

export const getDepositGraph = async (req, res) => {
  let success = false;

  try {
    let deposits = await Deposit.aggregate([
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
      deposits,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};
