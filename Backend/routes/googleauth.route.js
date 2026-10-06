import express from "express";
import passport from "passport";
import { googleCallback } from "../Controllers/auth/googleauth.controller.js";
import ConnectDB from "../config/MongoDb.js";


const router = express.Router();
await ConnectDB();
// Step 1: user ko Google pe bhejta hai
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Step 2: Google yahan wapas bhejta hai
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed`,
  }),
  googleCallback
);

export default router;