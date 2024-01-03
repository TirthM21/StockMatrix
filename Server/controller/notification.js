import config from "../config.js";
import Notification from "../model/Notification.js";
import Portfolio from "../model/Portfolio.js";
import axios from "axios";

// Reminder for SIP Payment
export const investSIPNotification = async (req, res) => {
  let success = false;
  try {
    let todayDate = new Date();

    let portfolio = await Portfolio.findOne({ user_id: req.user.id });

    if (!portfolio) {
      return res.status(404);
    }

    // console.log(portfolio);

    for (const el of portfolio.mutual_funds) {
      let mfDate = new Date(el.date_of_buy);

      if (
        mfDate.getTime() - todayDate.getTime() === 2592000 &&
        el.type_mf === 1
      ) {
        const obj = {
          today_date: todayDate,
          ...el,
        };

        let notification = await Notification.findOne({
          user_id: req.user.id,
          symbol: el.symbol,
        });

        if (notification) {
          continue;
        } else {
          let body = `SIP Investment Reminder for ${el.name} - ₹${el.buy_price}`;

          await Notification.create({
            symbol: el.symbol,
            title: "SIP - Reminder",
            user_id: req.user.id,
            data: obj,
            body,
            type: "reminder",
            read: false,
          });
        }
      }
    }

    let notifications = await Notification.find({
      user_id: req.user.id,
      read: false,
    });

    success = true;

    return res.status(200).send({
      success,
      notifications,
    });

    // Super Pumped
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Read Notification
export const getReadNotification = async (req, res) => {
  let success = false;
  try {
    let notifications = await Notification.find({
      user_id: req.user.id,
      read: true,
    });
    success = true;
    return res.status(200).send({
      success,
      notifications,
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};

// Marked as Read Notification
export const markAsRead = async (req, res) => {
  let success = false;

  try {
    const { id } = req.params;

    let notification = await Notification.findOneAndUpdate(
      { user_id: req.user.id, _id: id },
      {
        $set: {
          read: true,
        },
      }
    );

    success = true;

    return res.status(200).send({
      success,
      message: "Marked as Read.",
    });
  } catch (err) {
    return res.status(500).send({
      success,
      message: "Internal Server Error.",
    });
  }
};
