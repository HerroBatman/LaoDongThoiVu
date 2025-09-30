import mongoose from "mongoose";// dung mongoose de ket noi voi MONGODB
import dotenv from "dotenv";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || '');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};
// tao ket noi voi MongoDB
export default connectDB;
