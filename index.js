require('dotenv').config()
const express = require('express')
const app = express()

const PORT = process.env.PORT ||  8080;

const routes = require("./routes/api")

//const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

//require('./auth/passport')(passport);

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 900000 },
  }),
);

//app.use(passport.initialize());
//app.use(passport.session());

app.use("/", routes);

require('./models/db').connectDb()
require('./models/db').initUsers()

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})