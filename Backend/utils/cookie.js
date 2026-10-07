import config from "../config/config.js";

export function generateCookieToken(res, refreshToken, accessToken) {
  const isProduction = config.NODE_ENV === "production";

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  res.cookie("accessToken", accessToken, cookieOptions);
}