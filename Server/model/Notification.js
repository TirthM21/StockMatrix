import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema(
  {
    symbol: {
      type: String,
    },
    body: {
      type: String,
    },
    data: {
      type: Object,
    },
    title: {
      type: String,
    },
    user_id: {
      type: Schema.Types.ObjectId,
    },
    type: {
      type: String,
      default: "reminder",
    },
    read: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notifications", NotificationSchema);
