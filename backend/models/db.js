import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();
const mongo_url = process.env.MONGO_CONNECTION;
const connectDB = async () => {
    try {
        await mongoose.connect(mongo_url);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1); // Exit process if DB connection fails
    }
};

export default connectDB;
