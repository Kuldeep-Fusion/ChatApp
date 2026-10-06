import mongoose from "mongoose";
import config from "./config.js";

async function ConnectDB() {
  try {
    console.log("🔄 MongoDB connection starting...");
    console.log("MONGO_URI exists:", Boolean(config.MONGO_URI));

    const connection = await mongoose.connect(config.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB connected");
    console.log("Host:", connection.connection.host);
    console.log("Database:", connection.connection.name);

    return connection;
  } catch (error) {
    console.error("❌ MongoDB connection failed");
    console.error(error.message);

    throw error;
  }
}

export default ConnectDB;