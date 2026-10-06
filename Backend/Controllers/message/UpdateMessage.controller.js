import cloudinary from "../../config/cloudinary.js";
import Message from "../../models/Message.model.js";

export async function UpdateMessage(req, res) {
   try {
    const myId = req.user.userId;
    const { messageId } = req.params;
    const { content } = req.body;

    // 1. Content check
    if (!content?.trim()) {
      return res.status(400).json({ success: false, message: "Content is required" });
    }

    // 2. Message dhundo
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    // 3. Sirf sender edit kar sakta hai
    if (String(message.sender) !== String(myId)) {
      return res.status(403).json({ success: false, message: "You can edit only your own messages" });
    }

    // 4. Sirf text message
    if (message.type !== "text") {
      return res.status(400).json({ success: false, message: "Only text messages can be edited" });
    }

    // 5. Update
    message.content = content.trim();
    message.isEdited = true;
    await message.save();

    return res.status(200).json({ success: true, data: message });
  } catch (error) {
    console.error("Failed to update message:", error);
    return res.status(500).json({ success: false, message: "Failed to update message" });
  }
}