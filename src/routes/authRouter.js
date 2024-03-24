const authRouter = require('express').Router();
const passport = require('passport');
const sessionData = require('express-session');


const UI_URL = process.env.UI_URL;

authRouter.get('/login/failed', function(req, res) {
  res.send({
    error: true,
    message: 'Login failed'
  });
});

authRouter.get('/login/google', passport.authenticate('google', {
    scope: [ 'profile','email' ]
}));

authRouter.get('/google/callback', passport.authenticate('google', {
    successRedirect: `${UI_URL}/auth/callback`,
    failureRedirect: '/login/failed'
}));

// If user is already logged in, redirect to home page
authRouter.get('/currentUser', function(req, res) {
  if (req.user) {
      return res.send({
        error: false,
        message: 'User is logged in',
        user: req.user,
      });
  } else {
    return res.send({
      error: true,
      message: 'User is not logged in'
    });
  }
})

authRouter.get("/logout", (req, res, next) => {
  req.logout(function(err){
    req.session.destroy(function (err) {
      if (!err) {
          res.status(200).clearCookie('connect.sid', {path: '/'}).json({status: "Success"});
      } else {
          console.log(err)
          res.status(400).send({message:'Hubo un error, y volvió por el else de /logout', err:err})
      }
  });
  });
  
});

module.exports = authRouter;