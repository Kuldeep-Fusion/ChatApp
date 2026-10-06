import { generateCookieToken } from "../../utils/cookie.js";
import { generateToken } from "../../utils/token.js";


export async function googleCallback(req, res) {
    try {
        const user = req.user; // passport ne diya (config/google.js se)

        const { refreshToken, accessToken } = generateToken(user._id);
        generateCookieToken(res, refreshToken, accessToken);

        user.isOnline = true;
        user.lastSeen = new Date();
        await user.save();

        return res.redirect(`${process.env.CLIENT_URL}/explore`);
    } catch (error) {
        console.log("google login failed", error);
        return res.redirect(`${process.env.CLIENT_URL}/login?error=server_error`);
    }
}