import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is missing in .env file");
    }

    await mongoose.connect(uri, {
      dbName: process.env.DB_NAME,
    });

    console.log("✅ MongoDB Connected to Cluster!");
  } catch (error) {
    console.error("❌ Database Connection Failed!", error);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectDB;

