const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    role: {
        type: String,
        required: true,
        enum: ['Coach', 'Athlete']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Prefer Not To Say']
    },
    address: {
        type: String,
        required: false
    },
    bookings: [
        {
          booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking',
            required: false,
            },
        },
    ],
    timeSlots: [
        {
            timeSlot: {
                type: mongoose.Schema.Types.ObjectId,
            ref: 'TimeSlot',
            required: false,
            }
        }
    ]
})

const User = mongoose.model('User', UserSchema);
module.exports = User;