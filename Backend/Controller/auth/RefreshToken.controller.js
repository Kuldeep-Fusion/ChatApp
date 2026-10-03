import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";
import { generateToken } from "../../utils/token.js";
import { generateCookieToken } from "../../utils/cookie.js";


export async function RefreshToken(req, res) {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      return res.status(401).json({ success: false, message: "No refresh token" });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET); // jo secret generateToken mein use hua
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const { accessToken, refreshToken } = generateToken(user._id);
    generateCookieToken(res, refreshToken, accessToken);

    return res.status(200).json({ success: true, token: accessToken });
  } catch {
    return res.status(401).json({ success: false, message: "Invalid refresh token" });
  }
}