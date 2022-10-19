const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CoachSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: false,
  },
  gender: {
    type: String,
    required: false,
    enum: ["Male", "Female"],
  },
  age: {
    type: Number,
    required: false,
  },
  aboutMe: {
    type: String,
    required: false,
  },
  skills: {
    type: String,
    required: false,
  },
  qualifications: {
    type: String,
    required: false,
  },
  contactInfo: {
    type: String,
    required: false,
  },
  sessionType: {
    type: String,
    required: false,
    enum: ["Private", "Group"],
  },
  privatePrice: {
    type: Number,
    required: false,
  },
  groupPrice: {
    type: Number,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  bookings: [
    {
      booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: false,
      },
    },
  ],
  timeSlots: [
    {
      timeSlot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlot",
        required: false,
      },
    },
  ],
});

const Coach = mongoose.model("Coach", CoachSchema);
module.exports = Coach;
