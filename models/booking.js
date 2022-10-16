const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookingSchema = new Schema({
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TimeSlot',
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
            athlete: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Trainee',
                required: true,
            },
        },
    ]
})

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking