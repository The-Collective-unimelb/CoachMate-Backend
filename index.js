require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const PORT = process.env.PORT || 5000;

const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

require("./passport")(passport);

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 900000 },
  })
);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

const generalRouter = require("./routes/generalRouter");
app.use("/", generalRouter);

const coachRouter = require("./routes/coachRouter");
app.use("/coaches", coachRouter);
const athleteRouter = require("./routes/athleteRouter");
app.use("/athlete", athleteRouter);

const bookingsRouter = require("./routes/bookings");
app.use("/bookings", bookingsRouter);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("coachmate-frontend/build"));

  app.get("/", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "coachmate-frontend", "build", "index.html")
    );
  });

  app.get("/login", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "coachmate-frontend", "build", "index.html")
    );
  });

  app.get("/signup", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "coachmate-frontend", "build", "index.html")
    );
  });

  app.get("/contact", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "coachmate-frontend", "build", "index.html")
    );
  });

  app.get("/about-us", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "coachmate-frontend", "build", "index.html")
    );
  });

  app.get("/signup-athlete", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "coachmate-frontend", "build", "index.html")
    );
  });
}

require("./models/db").connectDb();
// require("./models/db").initUsers();

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
