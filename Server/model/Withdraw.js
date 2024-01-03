import mongoose, { Schema } from "mongoose";

const WithdrawSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    transaction_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Withdraw", WithdrawSchema);
