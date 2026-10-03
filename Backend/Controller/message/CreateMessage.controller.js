import cloudinary from "../../config/cloudinary.js";
import User from "../../models/user.model.js";
import Message from "../../models/Message.Model.js";
import Conversation from "../../models/Conversation.Model.js";

export async function CreateMessage(req, res) {
  try {
    console.log(req.user);
    const senderId = req.user.userId;
    const { receiverId } = req.params;
    const { type, content } = req.body;

    // 1. Receiver check
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 2. Basic validation
    if (!["text", "image", "video", "file"].includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid message type" });
    }
    if (type === "text" && !content?.trim()) {
      return res.status(400).json({ success: false, message: "Content is required" });
    }
    if (type !== "text" && !req.file) {
      return res.status(400).json({ success: false, message: "Media file is required" });
    }

    // 3. Conversation: find or create
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // 4. Media upload (agar ho)
    let media = { url: "", publicId: "" };
    if (type !== "text") {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "ChatApp", resource_type: "auto" },
            (err, result) => (err ? reject(err) : resolve(result))
          )
          .end(req.file.buffer);
      });
      media = { url: result.secure_url, publicId: result.public_id , resourceType: result.resource_type,};
    }

    // 5. Message save
    const message = await Message.create({
      conversation: conversation._id,
      sender: senderId,
      receiver: receiverId,
      type,
      content: content?.trim() || "",
      media,
    });

    // 6. Conversation update
    conversation.lastMessage = message._id;
    conversation.lastMessageAt = message.createdAt;
    await conversation.save();

    return res.status(201).json({ success: true, data: message });
  } catch (error) {
    console.error("Failed to create message:", error);
    return res.status(500).json({ success: false, message: "Failed to create message" });
  }
}