const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookingSchema = new Schema({
    sessionTime: {
        type: DateTime,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking