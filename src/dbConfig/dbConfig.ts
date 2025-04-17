import mongoose from "mongoose";

let isConnected = false;

export async function connect() {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!);
        isConnected = true;
        console.log("MongoDB Connected");

    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to database");
    }
}
