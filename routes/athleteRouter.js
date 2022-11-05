const express = require("express");
const router = express.Router();
const generalController = require("../controllers/generalController");
const passport = require("passport");

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
  })
);

module.exports = router;
