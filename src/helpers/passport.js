require('dotenv').config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require('passport');
const User = require('../models/user');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.CLIENT_URL}/auth/google/callback`,
      passReqToCallback: true,
      scope: ["profile", "email"], //Info we need from google.
    },
    async(request, accessToken, refreshToken, profile, callback)=>{
        try{
            const usuario = await User.findOne({accountId : profile.id})
    
            if(!usuario){
                const user = new User({
                  displayName: profile.displayName,
                  name: profile.name.givenName,
                  surname: profile.name.familyName,
                  email: profile.emails[0].value,
                  country: profile._json.locale,
                  language: profile._json.locale,
                  picture: profile._json.picture,
                  accountType:profile.provider,
                  accountId:profile.id
              });
              await User.create(user)
            }
        callback(null, profile);

        }catch(err){
            console.log(err);
        }
    }
  )
);

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        console.log(user)
      cb(null, { id: user.id });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });