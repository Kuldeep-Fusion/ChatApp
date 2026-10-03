import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const emailObj = profile.emails?.[0];

        if (!emailObj) {
          return done(new Error("Google account has no email"), null);
        }

        const email = emailObj.value.toLowerCase();

        // 1. Pehle se Google se login kiya hua user
        let user = await User.findOne({ googleId: profile.id });
        if (user) return done(null, user);

        // 2. Same email ka email/password wala user
        user = await User.findOne({ email });
        if (user) {
          if (!emailObj.verified) {
            return done(new Error("Google email is not verified"), null);
          }
          user.googleId = profile.id;
          user.isVerified = true;
          if (!user.avatar) user.avatar = profile.photos?.[0]?.value || "";
          await user.save();
          return done(null, user);
        }

        // 3. Naya user
        user = await User.create({
          googleId: profile.id,
          authProvider: "google",
          name: profile.displayName,
          email,
          avatar: profile.photos?.[0]?.value || "",
          isVerified: true,
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;