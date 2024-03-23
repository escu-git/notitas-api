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

authRouter.post("/logout", (req, res, next) => {
  console.log(sessionData.Cookie.name)
 res.clearCookie('session');  // clear the session cookie
	req.logout(function(err) {  // logout of passport
		req.session.destroy(function (err) { // destroy the session
  console.log(sessionData.Cookie())
      res.redirect(`${UI_URL}/login`)
			// res.send(); // send to the client
		});
	});
});

module.exports = authRouter;