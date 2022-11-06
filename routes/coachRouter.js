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
  passport.authenticate("coach-login", {
    successRedirect: "/contact",
    failureRedirect: "/fail",
  })
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
  if (req.isAuthenticated()) {
    req.logout();
    res.sendStatus(200);
  }
});

module.exports = router;
