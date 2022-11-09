const express = require("express");
const router = express.Router();
const generalController = require("../controllers/generalController");
const coachController = require("../controllers/coachController");
const passport = require("passport");

const coach = require("../models/coach");
const utils = require("../utils");
const { findOne } = require("../models/coach");

router.get("/", (req, res) => {
  coach
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
});

router.get("/coach-dashboard", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../", "coachmate-frontend", "build", "index.html")
  );
});

router.post("/register", generalController.register);

router.post(
  "/login",
  passport.authenticate("coach-login", {
    successRedirect: "/contact",
    failureRedirect: "/fail",
  }),
  async (req, res) => {
    user.id = res._id;
    user.role = "coach";
  }
);

router.get("/getDetails", (req, res) => {
  // athlete.findOne(
  //   { email: req.session.passport.user.email },
  //   function (err, user) {
  //     if (err) console.log(err);

  //     const { first_name, last_name } = user;

  //     res.status(200).send({
  //       user,
  //     });
  //   }
  // );
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
    res.sendStatus(200);
  }
  user.id = null;
});

router.get("/:id", utils.coachIsLoggedIn, function (req, res, next) {
  coach.findById(req.params.id, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

router.post("/update", coachController.updateProfile);

module.exports = router;
