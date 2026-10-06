import AIChat from "../../models/aiChat.model.js";
import { generateAIResponse } from "../../services/gemini.service.js";

export const askAI = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { message } = req.body;

    // Auth check
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    // Message validation
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const question = message.trim();

    // Generate AI response
    const response = await generateAIResponse(question);

    if (!response) {
      return res.status(500).json({
        success: false,
        message: "AI response not generated",
      });
    }

    // Automatically save in MongoDB
    const chat = await AIChat.create({
      user: userId,
      question,
      response: response.trim(),
    });

    return res.status(200).json({
      success: true,
      message: "AI response generated successfully",
      data: chat,
    });
  } catch (error) {
    console.error("Ask AI Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });
  }
};