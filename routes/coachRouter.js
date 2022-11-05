const express = require("express");
const router = express.Router();
const generalController = require("../controllers/generalController");
const passport = require("passport");

const coach = require("../models/coach");

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

router.get("/coach-dashboard", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../", "coachmate-frontend", "build", "index.html")
  );
});

router.post("/register", generalController.register);

router.post(
  "/login",
  passport
    .authenticate("coach-login", {
      successRedirect: "/contact",
      failureRedirect: "/fail"
    })
);

module.exports = router;
