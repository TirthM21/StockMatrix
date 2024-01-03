import mongoose, { Schema } from "mongoose";

const BankBalanceSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  balance: {
    type: Number,
    default: 1_00_000,
  },
}, {
  timestamps: true
});

export default mongoose.model("BankBalance", BankBalanceSchema);
