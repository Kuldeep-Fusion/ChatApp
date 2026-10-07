import jwt from "jsonwebtoken";
import { parse } from "cookie";
import config from "../config/config.js";

export function SocketAuthMiddleware(socket, next) {
  try {
    let token;
     console.log("SOCKET COOKIE:", socket.handshake.headers.cookie);
    console.log("SOCKET AUTH:", socket.handshake.auth);
    console.log("SOCKET AUTHORIZATION:", socket.handshake.headers.authorization);

    // 1. Authorization header (Bearer)
    const authHeader = socket.handshake.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2. Cookie se (httpOnly cookie ke liye yahi use hota hai)
    else if (socket.handshake.headers.cookie) {
      const cookies = parse(socket.handshake.headers.cookie);
      token = cookies.accessToken;
    }

    // 3. Optional: client ne auth me token bheja ho
    else if (socket.handshake.auth?.token) {
      token = socket.handshake.auth.token;
    }

    if (!token) {
      return next(new Error("Unauthorized: token nahi mila"));
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    socket.user = decoded; // ab har event me socket.user milega

    next();
  } catch (error) {
    console.log("SOCKET JWT ERROR:", error.message);
    next(new Error("Invalid or expired token"));
  }
}