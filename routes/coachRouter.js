const express = require("express");
const router = express.Router();
const generalController = require("../controllers/generalController");
const passport = require("passport");

const coach = require("../models/coach");
const utils = require('../utils')

router.get("/", (req, res) => {
  coach
    .find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", dataError);
    });
});

router.get("/coach-dashboard", utils.coachIsLoggedIn, (req, res) => {
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
  })
);

router.get("/getDetails", utils.coachIsLoggedIn, (req, res) => {
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
  if (req.isAuthenticated()) {
    req.logout();
    res.sendStatus(200);
  }
});

router.get("/:id", utils.coachIsLoggedIn, function (req, res, next) {
  coach.findById(req.params.id, function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

router.post("/update", utils.coachIsLoggedIn, (req, res) => {
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
  coach.updateOne(_id, data, { multi: true }, function (err, data) {
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      console.log("success");
      res.send(data);
    }
  });
  // coach.findByIdAndUpdate(
  //   _id,
  //   data,
  //   { upsert: true, new: true },
  //   function (err, data) {
  //     if (err) {
  //       console.log("err", err);
  //       res.status(500).send(err);
  //     } else {
  //       console.log("success");
  //       res.send(data);
  //     }
  //   }
  // );
});

module.exports = router;
