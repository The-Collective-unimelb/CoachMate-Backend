const Coach = require("../models/coach");
const Booking = require("../models/booking");
const Trainee = require("../models/trainee");

exports.viewBookings = async (req, res) => {
  const coachId = USER.id;
  var book = await Booking.find({ coach: await Coach.findById(coachId) });

  for (let i = 0; i < book.length; i++) {
    book[i].groupSize = book[i].trainees.length;
  }

  res.send(book);
};

exports.acceptBooking = async (req, res) => {
  const booking = await Booking.findById(req.body.bookingId);
  console.log(booking);
  if (booking) {
    booking.status = "Booked";
    await booking.save();
  } else {
    throw Error("Acceptance failed");
  }
};

exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.body.bookingId);
  console.log(booking);
  if (booking) {
    booking.status = "Cancelled";
    await booking.save();
  } else {
    throw Error("Cancellation failed");
  }
};

exports.updateProfile = async (req, res) => {
  const coach = await Coach.findById(req.body.id);
  const body = req.body;
  coach.firstName = body.firstName;
  coach.lastName = body.lastName;
  coach.age = body.age;
  coach.gender = body.gender;
  //   coach.password = await bcrypt.hash(body.password, 10);
  coach.phone = req.body.phone;
  coach.address = req.body.address;
  coach.aboutMe = req.body.aboutMe;
  coach.skills = req.body.skills;
  coach.qualifications = req.body.qualifications;
  coach.contactInfo = req.body.contactInfo;
  coach.privatePrice = req.body.privatePrice;
  coach.groupPrice = req.body.groupPrice;

  if (
    (await Coach.findOne({ email: body.email })) &&
    coach.email != body.email
  ) {
    throw Error("Email is already registered");
  } else {
    coach.email = body.email;
  }

  await coach.save();

  res.sendStatus(200);
};
