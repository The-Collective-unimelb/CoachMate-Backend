const express = require("express");
const router = express.Router();

const booking = require("../models/booking");

router.get("/", (req, res) => {
    booking
      .find({})
      .then((data) => {
        console.log("Data: ", data);
        res.json(data);
      })
      .catch((error) => {
        console.log("error: ", dataError);
      });
  });

  module.exports = router;