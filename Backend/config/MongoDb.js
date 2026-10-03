import mongoose from "mongoose";
import config from "./config.js";

async function ConnectDB() {
    try {
        await mongoose.connect(config.MONGO_URI);

        console.log("MongoDB connected to server");
    } catch (error) {
        console.error("Failed to connect MongoDB to server:", error);
        throw error;
    }
}

export default ConnectDB;
