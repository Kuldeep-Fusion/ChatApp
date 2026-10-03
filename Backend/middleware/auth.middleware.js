import jwt from 'jsonwebtoken'
import config from '../config/config.js';

export async function AuthMiddleware(req, res, next) {
    try {
        let token;
        // 1. Pehle Bearer header (normal login)
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
        // 2. Nahi mila to cookie (Google login)
        else if (req.cookies?.accessToken) {
            token = req.cookies.accessToken;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        console.log("JWT ERROR:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}