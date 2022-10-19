const bcrypt = require("bcrypt");
const Coach = require("../models/coach");
const Trainee = require("../models/trainee");

exports.register = async (req, res) => {
  try {
    const body = req.body;
    console.log(req.body.role);

    if (body.role === "Athlete") {

      if (await Trainee.findOne({ email: body.email })) {
        console.log("This email is already registered");
        throw Error("This email is already registered");
      }

      const newTrainee = new Trainee({
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        bookings: [],
      });

      console.log(newTrainee)

      await newTrainee.save((error) => {
        if (error) {
          res.status(500).json({
            msg: "Internal Server Error",
          });
        } else {
          console.log("Data has been saved in MongoDB");
          req.flash("successfulMessage", "Successfully Registered");
        }
      });

    } else if (body.role === "Coach") {

      if (await Coach.findOne({ email: body.email })) {
        console.log("This email is already registered");
        throw Error("This email is already registered");
      }

      const newCoach = new Coach({
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        gender: body.gender,
        age: body.age,
        address: body.address,
        bookings: [],
        timeSlot: [],
      });

      console.log(newCoach)

      await newCoach.save((error) => {
        if (error) {
          res.status(500).json({
            msg: "Internal Server Error",
          });
        } else {
          console.log("Data has been saved in MongoDB");
          req.flash("successfulMessage", "Successfully Registered");
        }
      });
    }
  } catch (err) {
    console.log("Register Error!");
    req.flash("Register Error", "Register Failed");
  }
};
