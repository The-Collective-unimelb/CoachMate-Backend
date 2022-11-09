const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookingSchema = new Schema({
    sessionTime: {
        type: String,
        ref: 'sessionTime',
        required: true
    },
    sessionDate: {
        type: String,
        ref: 'sessionDate',
        required: true
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coach',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Booked', 'Cancelled', 'Completed', 'Pending']
    },
    trainees: [
        {
            trainee: {
                type: mongoose.Schema.Types.ObjectId,
                ref: '/Trainee',
                required: false,
            },
        },
    ]
})

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking