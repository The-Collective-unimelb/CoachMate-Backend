const express = require("express");
const router = express.Router();

const coach = require("../models/coach");
const user = require("../models/user");

router.get("/", (req, res) => {
  user
    .find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", dataError);
    });
});

router.post("/submit", (req, res) => {

  const data = req.body;
  const newUser = new user(data);

  console.log(newUser);

  newUser.save((error) => {
    if (error) {
      res.status(500).json({
        msg: "Internal Server Error"
      })
    } else {
      res.json({
        msg: "Data has been saved in database",
      });
    }
  });
});

module.exports = router;
