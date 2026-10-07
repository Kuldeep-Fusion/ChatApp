import { generateToken } from "../../utils/token.js";


export async function googleCallback(req, res) {
    try {
        const user = req.user; // passport ne diya (config/google.js se)

        const { refreshToken, accessToken } = generateToken(user._id);

        user.isOnline = true;
        user.lastSeen = new Date();
        await user.save();

        // Mobile browsers cross-site cookies block karte hain OAuth redirect mein.
        // Fix: tokens URL params mein bhejo, frontend same-site context mein store karega.
        const redirectUrl = new URL(`${process.env.CLIENT_URL}/auth/google/success`);
        redirectUrl.searchParams.set("accessToken", accessToken);
        redirectUrl.searchParams.set("refreshToken", refreshToken);

        return res.redirect(redirectUrl.toString());
    } catch (error) {
        console.log("google login failed", error);
        return res.redirect(`${process.env.CLIENT_URL}/auth/login?error=server_error`);
    }
}