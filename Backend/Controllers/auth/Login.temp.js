import User from "../../models/user.model.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../../utils/token.js";
import { generateCookieToken } from "../../utils/cookie.js";

export async function LoginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Fill all details", success: false });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    // Google user: compare se PEHLE
    if (!user.password) {
      return res.status(400).json({
        message: "This account uses Google login. Please login with Google",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password", success: false });
    }

    const { refreshToken, accessToken } = generateToken(user._id);
    generateCookieToken(res, refreshToken, accessToken);

    user.isOnline = true;
    user.lastSeen = new Date();
    await user.save();

    return res.status(200).json({ message: "Login successful", success: true, token: accessToken });
  } catch (error) {
    console.log("failed to login user", error);
    return res.status(500).json({ message: "login failed", success: false });
  }
}