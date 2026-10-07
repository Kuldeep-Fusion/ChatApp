import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import { generateToken } from "../../utils/token.js";
import { generateCookieToken } from "../../utils/cookie.js";
import config from "../../config/config.js";


export async function RefreshToken(req, res) {
  try {
    // Cookie se pehle try karo (desktop), phir Authorization header (mobile Google login)
    let token = req.cookies?.refreshToken;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "No refresh token" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET); // jo secret generateToken mein use hua
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const { accessToken, refreshToken } = generateToken(user._id);
    generateCookieToken(res, refreshToken, accessToken);

    return res.status(200).json({ success: true, token: accessToken });
 } catch (err) {
  console.log("REFRESH ERROR:", err.name, "-", err.message);

  return res.status(401).json({
    success: false,
    message: "Invalid refresh token",
  });
}
}