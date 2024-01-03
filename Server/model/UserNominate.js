import mongoose, { Schema } from "mongoose";

const UserNomiteSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  nominate: {
    relationship: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
});

export default mongoose.model("UserNominate", UserNomiteSchema);
