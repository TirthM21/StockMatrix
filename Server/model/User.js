import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    basic: {
      full_name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    info: {
      dob: {
        type: Date,
      },
      pan: {
        type: String,
      },
      sourceWealth: {
        type: String,
      },
      address: {
        type: String,
      },
    },
    bank: {
      accountNumber: {
        type: String,
      },
      accountType: {
        type: String,
      },
      ifsc: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    verified: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
