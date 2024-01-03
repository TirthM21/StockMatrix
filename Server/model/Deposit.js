import mongoose, { Schema } from "mongoose";

const DepositSchema = new Schema(
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
    bank_account_number: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Deposit", DepositSchema);
