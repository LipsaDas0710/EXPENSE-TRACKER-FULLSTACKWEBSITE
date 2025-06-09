const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
},



async (accessToken, refreshToken, profile, done) => {
  try {
    console.log(profile)
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

   const savedUser = await User.create({
        googleId: profile.id,
        username: profile.name.givenName,
        email: profile.emails[0].value,
        password: ''
    });
    return done(null, savedUser);


  } catch (error) {
    console.error('Error in strategy:', error);
    done(error, null);
  }
  console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "Exists" : "Missing");
console.log("GOOGLE_CALLBACK_URL:", process.env.GOOGLE_CALLBACK_URL);

}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
