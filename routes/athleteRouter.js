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

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username});
  const validPw = await bcrypt.compare(password, user.password);
  if (validPw) {
    Console.log("Authenticated")
  } else {
    Console.log("Wrong password or username");
  }
})

module.exports = router;