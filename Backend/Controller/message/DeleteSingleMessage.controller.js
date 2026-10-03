import cloudinary from "../../config/cloudinary.js";
import Message from "../../models/Message.Model.js";


export async function DeleteSingleMessage(req, res) {
     try {
    const myId = req.user.userId;
    const { messageId } = req.params;

    // 1. Message dhundo
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    // 2. Sirf sender delete kar sakta hai
    if (String(message.sender) !== String(myId)) {
      return res.status(403).json({ success: false, message: "You can delete only your own messages" });
    }

    // 3. Media hai to Cloudinary se hatao
    if (message.media?.publicId) {
      const resourceType =
        message.media.resourceType ||
        (message.type === "video" ? "video" : "image"); // purane messages ka fallback

      await cloudinary.uploader.destroy(message.media.publicId, {
        resource_type: resourceType,
      });
    }

    // 4. Database se message hatao
    await message.deleteOne();

    // 5. Agar yahi last message tha, conversation update karo
    const conversation = await Conversation.findById(message.conversation);
    if (conversation && String(conversation.lastMessage) === String(message._id)) {
      const prev = await Message.findOne({ conversation: conversation._id })
        .sort({ createdAt: -1 });

      conversation.lastMessage = prev?._id || null;
      conversation.lastMessageAt = prev?.createdAt || null;
      await conversation.save();
    }

    return res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("Failed to delete message:", error);
    return res.status(500).json({ success: false, message: "Failed to delete message" });
  }
}