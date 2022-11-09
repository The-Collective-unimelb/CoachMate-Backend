const express = require("express");
const router = express.Router();
const generalController = require("../controllers/generalController");
const traineeController = require("../controllers/traineeController");
const passport = require("passport");
const utils = require("../utils");

const athlete = require("../models/trainee");

router.get("/", (req, res) => {
  athlete
    .find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", dataError);
    });
});

router.post("/register", generalController.register);

router.post(
  "/login",
  passport.authenticate("trainee-login", {
    successRedirect: "/",
    failureRedirect: "/fail",
    session: true
  }),
  async (req, res) => {
    console.log(res);
    user._id = res._id;
    user.role = "trainee";

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
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
    res.sendStatus(200);
  }
});

router.post(
  "/bookSession",
  traineeController.bookSession
);

router.post("/update", (req, res) => {
  console.log("req.body", req.body);
  var _id = req.body._id;
  var data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    gender: req.body.gender,
    age: req.body.age,
    address: req.body.address,
    email: req.body.email,
    password: req.body.password,
    aboutMe: req.body.aboutMe,
    skills: req.body.skills,
    qualifications: req.body.qualifications,
    contactInfo: req.body.contactInfo,
    privatePrice: req.body.privatePrice,
    groupPrice: req.body.groupPrice,
  };
  athlete.updateOne(_id, data, { multi: true }, function (err, data) {
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      console.log("success");
      res.send(data);
    }
  });
});

module.exports = router;
