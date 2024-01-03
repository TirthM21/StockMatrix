import mongoose, { Schema } from "mongoose";

const PortfolioSchema = new Schema(
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
        no_of_shares: {
          type: Number,
        },
        date_of_buy: {
          type: Date,
        },
      },
    ],
    mutual_funds: [
      {
        name: {
          type: String,
        },
        one_year_return: {
          type: Number,
        },
        symbol: {
          type: String,
        },
        buy_price: {
          type: Number,
        },
        total_price: {
          type: Number,
        },
        remaining_price: {
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
      },
    ],
    total_investment: {
      type: Number,
      default: 0,
    },
    total_profit: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Portfolio", PortfolioSchema);
