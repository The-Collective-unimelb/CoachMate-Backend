const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TimeSlotSchema = new Schema({
    sessionID: {
        type: Number,
        required: true
    },
    coachID: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
})

const TimeSlot = mongoose.model('TimeSlot', TimeSlotSchema);
module.exports = TimeSlot