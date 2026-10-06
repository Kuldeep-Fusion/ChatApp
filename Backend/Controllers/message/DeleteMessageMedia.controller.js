export async function DeleteMessageMedia(req, res) {
  try {
    const myId = req.user.userId;
    const { messageId } = req.params;

    // 1. Message dhundo
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    // 2. Sirf sender
    if (String(message.sender) !== String(myId)) {
      return res.status(403).json({ success: false, message: "You can delete only your own media" });
    }

    // 3. Media hai bhi ya nahi
    if (!message.media?.publicId) {
      return res.status(400).json({ success: false, message: "No media to delete" });
    }

    // 4. Cloudinary se hatao
    const resourceType =
      message.media.resourceType ||
      (message.type === "video" ? "video" : "image");

    await cloudinary.uploader.destroy(message.media.publicId, {
      resource_type: resourceType,
    });

    // 5. Message rakho, sirf media khaali karo
    message.media = { url: "", publicId: "", resourceType: "" };
    message.isMediaDeleted = true;
    await message.save();

    return res.status(200).json({ success: true, data: message });
  } catch (error) {
    console.error("Failed to delete media:", error);
    return res.status(500).json({ success: false, message: "Failed to delete media" });
  }
}