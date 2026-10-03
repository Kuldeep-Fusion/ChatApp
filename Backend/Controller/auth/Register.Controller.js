import bcrypt from "bcrypt";
import User from "../../models/user.model.js";

export async function RegisterUser(req, res) {
  try {
    const { name, username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
        success: false,
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (user) {
      const message =
        user.authProvider === "google"
          ? "This email is registered with Google. Please login with Google"
          : "Email already registered";
      return res.status(409).json({ message, success: false });
    }

    const usernameExists = await User.findOne({ username: normalizedUsername });
    if (usernameExists) {
      return res.status(409).json({
        message: "Username already taken",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to register",
      success: false,
    });
  }
}