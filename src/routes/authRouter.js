const authRouter = require('express').Router();
const passport = require('passport');

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
    successRedirect: `${UI_URL}`,
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

authRouter.get("/logout", (req, res) => {
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect(`${UI_URL}`);
  });
});

module.exports = authRouter;