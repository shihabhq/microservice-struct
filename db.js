import mongoose from "mongoose";

function connectDB(uri) {
  return mongoose.connect(uri);
}

export default connectDB;
