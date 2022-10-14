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
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
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
    required: true,
    enum: ["Private", "Group"],
  },
  privatePrice: {
    type: Number,
    required: true,
  },
  groupPrice: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
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
