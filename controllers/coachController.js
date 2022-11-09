const Coach = require("../models/coach");
const Booking = require("../models/booking");

exports.viewBookings = async (req, res) => {
    const coachId = req.session.passport.user._id
    return await Booking.find({coach: coachId})
}

exports.acceptBooking = async (req, res) => {
    const coach = await Coach.findById(req.session.passport.user._id)
    const booking = await coach.bookings.findById(req.body.bookingId)

  if (booking) {
    booking.status = "Booked";
    await booking.save();
  } else {
    throw Error("Acceptance failed");
  }
};

exports.updateProfile = async (req, res) => {
  const coach = await Coach.findById(req.user._id);
  const body = req.body;
  coach.firstName = body.firstName;
  coach.lastName = body.lastName;
  coach.age = body.age;
  coach.gender = body.gender;
//   coach.password = await bcrypt.hash(body.password, 10);
  coach.phone = req.body.phone;
  coach.address = req.body.address;
  coach.email = req.body.email;
  coach.aboutMe = req.body.aboutMe;
  coach.skills = req.body.skills;
  coach.qualifications = req.body.qualifications;
  coach.contactInfo = req.body.contactInfo;
  coach.privatePrice = req.body.privatePrice;
  coach.groupPrice = req.body.groupPrice;

  if (await Coach.findOne({ email: body.email })) {
    throw Error("Email is already registered");
  } else {
    coach.email = body.email;
  }

  await coach.save();
};
