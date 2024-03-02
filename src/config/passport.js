require('dotenv').config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require('passport');
const User = require('../models/user');
const userController = require('../controllers/userController');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.CLIENT_URL}/auth/google/callback`,
    },
    async(request, accessToken, refreshToken, profile, cb)=>{
        try{
            let usuarioExistente = await User.findOne({accountId : profile.id})
    
            if(!usuarioExistente){
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
              const nuevoUsuario = await User.create(user)
              cb(null, nuevoUsuario);
            }
            else{
              cb(null, usuarioExistente)
            }
        }catch(err){
            console.log(err);
        }
    }
  )
);

passport.serializeUser((user, cb)=> {
    cb(null, user.id)
  });
  
  passport.deserializeUser((id, cb)=> {
    User.findById(id)
    .then(res=>{
      cb(null, res)})
});