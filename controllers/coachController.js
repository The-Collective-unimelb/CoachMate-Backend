const Coach = require("../models/coach");
const Booking = require("../models/booking");

exports.viewBookings = async (req, res) => {
    const coachId = USER.id
    return await Booking.find({coach: coachId})
}

exports.acceptBooking = async (req, res) => {
    const coach = await Coach.findById(USER.id)
    const booking = await coach.bookings.findById(req.body.bookingId)

  if (booking) {
    booking.status = "Booked";
    await booking.save();
  } else {
    throw Error("Acceptance failed");
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

  if (await Coach.findOne({ email: body.email }) && coach.email != body.email) {
    throw Error("Email is already registered");
  } else {
    coach.email = body.email;
  }

  await coach.save();

  res.sendStatus(200);
};
