import Conversation from "../../models/Conversation.model.js";
import Message from "../../models/Message.model.js";



export async function GetSingleMessage(req, res) {
  try {
    const myId = req.user.userId;
    const { receiverId } = req.params;

    // 1. Dono ki conversation dhundo
    const conversation = await Conversation.findOne({
      participants: { $all: [myId, receiverId] },
    });

    // Agar abhi tak chat hui hi nahi
    if (!conversation) {
      return res.status(200).json({ success: true, data: [] });
    }

    // 2. Us conversation ke saare messages lao
    const messages = await Message.find({ conversation: conversation._id })
      .sort({ createdAt: 1 }); // 1 = purane pehle, naye neeche

    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error("Failed to get messages:", error);
    return res.status(500).json({ success: false, message: "Failed to get messages" });
  }
}