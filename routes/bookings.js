const express = require("express");
const router = express.Router();
const coachController = require("../controllers/coachController");
const booking = require("../models/booking");

router.get("/coach", coachController.viewBookings);

  module.exports = router;