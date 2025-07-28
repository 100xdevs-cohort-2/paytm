import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import AppError from '../utils/error.js';

export async function dbConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    throw new AppError("Database connection failed", 500); // use throw instead of next()
  }
}

export async function dbDisconnect() {
  try {
    await mongoose.disconnect();
    console.log("Database disconnected successfully");
  } catch (error) {
    throw new AppError("Database disconnection failed", 500);
  }
}
