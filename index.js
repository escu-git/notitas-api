const sessionData = require('express-session');
const express = require('express');
var cors = require('cors');
const passport = require('passport');
require('./src/config/passport');
const bodyParser = require('body-parser');
const app = express();
const mongooseConnect = require('./src/config/moongose-connection');
const authRouter = require('./src/routes/authRouter');
const notesRouter = require('./src/routes/notesRouter');
const userRouter = require('./src/routes/userRouter');
const auth = require('./src/helpers/auth');
require('dotenv').config();
const cookies = require("cookie-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookies());
//Config CORS:
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods:"GET,POST,PUT,DELETE"
}))

app.use(sessionData({
    secret:process.env.SESSION,
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))

//Config passport (login)
app.use(passport.initialize());
app.use(passport.session());


//Auth
app.use("/auth", (req, res, next) => {
    console.log('----- /AUTH INFO:------')
    console.log("Session data:", req.session);
    console.log("Cookies:", req.cookies);
    console.log('-----------------------')
    next();
  }, authRouter);

// app.use("/*", auth.checkLoggedUser); //Check if the user is logged in to access any route except / and /register
app.use("/notes", notesRouter );
app.use("/user", userRouter );


mongooseConnect();

app.listen(5000, (req, res)=>{
console.log("Server is listening on port 5000");
})