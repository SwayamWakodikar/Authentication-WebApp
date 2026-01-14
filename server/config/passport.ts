import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../model/user.js";
import dotenv from "dotenv";
dotenv.config();
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
});
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    passReqToCallback: true,
},
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails?.[0]?.value;
            const googleId = profile.id;
            let existingUser = await User.findOne({ googleId });
            if (existingUser) {
                return done(null, existingUser);
            }
            existingUser = await User.findOne({ email });
            if (existingUser) {
                existingUser.googleId = googleId;
                await existingUser.save();
                return done(null, existingUser);
            }
            const newUser = new User({
                googleId: googleId,
                name: profile.displayName,
                email: email,
                username: email?.split('@')[0] + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
                profileImage: profile.photos?.[0]?.value
            });
            await newUser.save();
            done(null, newUser);

        }
        catch (error) {
            console.error("Error Login in ", error);
            done(error as Error, false);
        }
    }
))