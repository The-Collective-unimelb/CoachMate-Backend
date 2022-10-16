const express = require("express");
const router = express.Router();

const user = require("../models/trainee");

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
      console.log("Data has been saved in MongoDB");
      res.json({
        msg: "Data has been saved in MongoDB",
      });
    }
  });
});

module.exports = router;
