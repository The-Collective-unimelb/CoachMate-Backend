const express = require("express");
const router = express.Router();
const generalController = require("../controllers/generalController");
const traineeController = require("../controllers/traineeController");
const passport = require("passport");
const utils = require("../utils");
const bcrypt = require("bcrypt");
const Trainee = require("../models/trainee");

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
  async (req, res, next) => {
    var athlete = await Trainee.findOne({ email: req.body.email });
    if (athlete) {
      if (await bcrypt.compare(req.body.password, athlete.password)) {
        USER = { id: athlete.id, role: "athlete" };
      }
    }

    console.log(USER);
    return next();
  },
  passport.authenticate("trainee-login", {
    successRedirect: "/",
    failureRedirect: "/fail",
  })
);

router.get("/getDetails", async (req, res) => {
  var trainee = await Trainee.findById(USER.id);
  res.send(trainee);
});

router.get("/getId", (req, res) => {
  res.send(USER.id);
});

router.post("/logout", (req, res) => {
  console.log(USER);
  if (USER) {
    USER = null;
    res.redirect("/");
  }
});

router.post(
  "/bookSession",
  (req, res, next) => {
    console.log(USER);
    return next();
  },
  traineeController.bookSession
);

router.get("/viewBookings", traineeController.viewBookings);

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
