const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

var TraineeSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: false
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

TraineeSchema.plugin(passportLocalMongoose)
const Trainee = mongoose.model('Trainee', TraineeSchema);
module.exports = Trainee;
