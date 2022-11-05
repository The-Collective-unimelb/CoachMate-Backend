const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const Trainee = require("./models/trainee");
const Coach = require("./models/coach");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    console.log("Serializing")
    done(null, { _id: user._id, role: user.role });
  });

  passport.deserializeUser((login, done) => {
    console.log("Deserializing")
    if (login.role === "athlete") {
      Trainee.findById(login._id, (err, user) => {
        return done(err, { ...user.toObject(), role: "athlete" });
      });
    } else if (login.role === "coach") {
      Coach.findById(login._id, (err, user) => {
        return done(err, { ...user.toObject(), role: "coach" });
      });
    } else {
      return done("This user does not have role", null);
    }
  });

  passport.use(
    "trainee-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        process.nextTick(() => {
          Trainee.findOne({ email }, async (err, trainee) => {
            if (err) {
              return done(err);
            } else if (!trainee) {
              return done(
                null,
                false,
                req.flash("loginMessage", "No user found.")
              );
            } else if (!(await bcrypt.compare(password, trainee.password))) {
              return done(
                null,
                false,
                req.flash("loginMessage", "Failed! Wrong password.")
              );
            } else {
              return done(
                null,
                { ...trainee.toObject(), role: "trainee" },
                req.flash("loginMessage", "Login successful")
              );
            }
          });
        });
      }
    )
  );

  passport.use(
    "coach-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        console.log("email: " + email + " password: " + password);
        process.nextTick(() => {
          Coach.findOne({ email }, async (err, coach) => {
            if (err) {
              return done(err);
            } else if (!coach) {
              console.log("No user found");
              return done(
                null,
                false,
                req.flash("loginMessage", "No user found.")
              );
            } else if (!(await bcrypt.compare(password, coach.password))) {
              console.log("Wrong Password");
              return done(
                null,
                false,
                req.flash("loginMessage", "Failed! Wrong password.")
              );
            } else {
              console.log("Coach is logged in");
              return done(
                null,
                { ...coach.toObject(), role: "coach" },
                req.flash("loginMessage", "Login successful")
              );
            }
          });
        });
      }
    )
  );
};
