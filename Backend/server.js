import http from "http";
import app from "./src/app.js";
import { initSocket } from "./src/socket/index.js";
import ConnectDB from "./config/MongoDb.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await ConnectDB();

    const server = http.createServer(app);

    const io = initSocket(server);

    app.set("io", io);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();