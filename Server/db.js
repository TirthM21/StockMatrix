import mongoose from "mongoose";
import config from "./config.js";

const connectToMongoDB = () => {
  mongoose
    .connect(config.mongo_uri)
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => console.log(err));
};

export default connectToMongoDB;
