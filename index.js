require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

//const passport = require('passport');
//const flash = require("express-flash");
//const session = require("express-session");

//require('./auth/passport')(passport);

// app.use(flash());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { maxAge: 900000 },
//   })
// );

//app.use(passport.initialize());
//app.use(passport.session());

const coachesRouter = require("./routes/coaches");
app.use("/api/coaches", coachesRouter);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("coachmate-frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname + "/coachmate-frontend/build/index.html")
    );
  });
}

require("./models/db").connectDb();
require("./models/db").initUsers();

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
