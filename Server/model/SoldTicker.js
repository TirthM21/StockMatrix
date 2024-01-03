import mongoose, { Schema } from "mongoose";

const SoldTickerSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    stocks: [
      {
        name: {
          type: String,
        },
        symbol: {
          type: String,
        },
        buy_price: {
          type: Number,
        },
        sell_price: {
          type: Number,
        },
        no_of_shares: {
          type: Number,
        },
        date_of_buy: {
          type: Date,
        },
        date_of_sell: {
          type: Date,
        },
        profit: {
          type: Number,
        },
      },
    ],
    mutual_funds: [
      {
        name: {
          type: String,
        },
        symbol: {
          type: String,
        },
        buy_price: {
          type: Number,
        },
        no_of_units: {
          type: Number,
        },
        type_mf: {
          type: Number,
        },
        total_years: {
          type: Number,
        },
        year_sell: {
          type: Number,
        },
        date_of_buy: {
          type: Date,
        },
        profit: {
          type: Number,
        },
      },
    ],
    etfs: [
      {
        name: {
          type: String,
        },
        symbol: {
          type: String,
        },
        buy_price: {
          type: Number,
        },
        no_of_shares: {
          type: Number,
        },
        date_of_buy: {
          type: Date,
        },
        date_of_sell: {
          type: Date,
        },
        profit: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SoldTicker", SoldTickerSchema);
