const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TraineeSchema = new Schema({
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
    phone: {
        type: Number,
        required: false
    },
    age: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: false,
        enum: ['Male', 'Female']
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
})

const Trainee = mongoose.model('Trainee', TraineeSchema);
module.exports = Trainee;
