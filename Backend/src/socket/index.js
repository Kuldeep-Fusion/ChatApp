import { Server } from "socket.io";
import { SocketAuthMiddleware } from "../../middleware/socket.middelware.js";
import config from "../../config/config.js";
import User from "../../models/user.model.js";
import Message from "../../models/Message.model.js";

export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: config.CLIENT_URL,
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  io.use(SocketAuthMiddleware);

  io.on("connection", async (socket) => {
    const userId = socket.user.userId;

    console.log("🟢 Connected:", userId, socket.id);

    // User ka private room
    socket.join(userId.toString());

    // Online
    await User.findByIdAndUpdate(userId, {
      isOnline: true,
    });

    // Sab connected users ko batana
    socket.broadcast.emit("user-online", {
      userId: userId.toString(),
    });

    // MESSAGE DELIVERED

    socket.on("message-delivered", async ({ messageId }) => {
      try {
        const message = await Message.findById(messageId);

        if (!message) return;

        if (message.receiver.toString() !== userId.toString()) {
          return;
        }

        if (message.status === "read") {
          return;
        }

        message.status = "delivered";

        await message.save();

        io.to(message.sender.toString()).emit("message-delivered", {
          messageId: message._id.toString(),
        });

        console.log(
          `✓✓ Message delivered: ${message._id}`
        );
      } catch (error) {
        console.error("Message delivered error:", error);
      }
    });

    // MESSAGE READ

    socket.on("message-read", async ({ messageId }) => {
      try {
        const message = await Message.findById(messageId);

        if (!message) return;

        if (message.receiver.toString() !== userId.toString()) {
          return;
        }

        message.status = "read";
        await message.save();

        // Sender ko read status bhejo
        io.to(message.sender.toString()).emit("message-read", {
          messageId: message._id.toString(),
        });

        console.log(
          `✓✓ Message read: ${message._id}`
        );
      } catch (error) {
        console.error("Message read error:", error);
      }
    });

    // DISCONNECT

    socket.on("disconnect", async () => {
      const lastSeen = new Date();

      await User.findByIdAndUpdate(userId, {
        isOnline: false,
        lastSeen,
      });

      socket.broadcast.emit("user-offline", {
        userId: userId.toString(),
        lastSeen,
      });

      console.log("🔴 Disconnected:", userId);
    });
  });

  return io;
}