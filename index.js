const express = require('express');
var cors = require('cors');
const passport = require('passport');
const passportSetup = require('./src/helpers/passport');
const sessionData = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const mongooseConnect = require('./src/helpers/moongose-connection');
const authRouter = require('./src/routes/authRouter');
const notesRouter = require('./src/routes/notesRouter');
const userRouter = require('./src/routes/userRouter');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

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
app.use("/auth", authRouter);

//Config CORS:
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods:"GET,POST,PUT,DELETE"

}))

app.use("/notes", notesRouter );
app.use("/user", userRouter );

mongooseConnect();

app.listen(5000, (req, res)=>{
console.log("Server is listening on port 5000");
})