export async function LogoutUser(req, res) {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });

    } catch (error) {
        console.error("Logout failed:", error);

        return res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }
}