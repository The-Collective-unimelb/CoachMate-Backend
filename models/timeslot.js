const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TimeSlotSchema = new Schema({
    sessionID: {
        type: String,
        required: true,
        unique: true
    },
    timeStart: {
        type: Date,
        required: true
    },
    timeEnd: {
        type: Date,
        required: true
    },
    sessionType: {
        type: String,
        required: true,
        enum: ['Private', 'Group']
    },
    price: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})

const TimeSlot = mongoose.model('TimeSlot', TimeSlotSchema);
module.exports = TimeSlot