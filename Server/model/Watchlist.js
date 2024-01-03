import mongoose, { Schema, mongo } from "mongoose";

const WatchListSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    mutual_funds: [
      {
        name: String,
        symbol: String,
      },
    ],
    stocks: [
      {
        name: String,
        symbol: String,
      },
    ],
    etfs: [
      {
        name: String,
        symbol: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("WatchList", WatchListSchema);
