const bcrypt = require('bcrypt')

const mongoose = require('mongoose')
const Coach = require('./coach')
const Trainee = require('./trainee')
const TimeSlot = require('./timeslot')
const Booking = require('./booking')

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost', {
            dbName: 'CoachMate'
        })

        console.log('Connected to MongoDB')
    } catch (err) {
        console.log(err, 'Connection to MongoDB failed')
        throw err
    }
}

async function initOneCoach() {
    const newCoach = new Coach({
        email: '123@abc.com',
        password: await bcrypt.hash('Coach', 10),
        firstName: 'Coa',
        lastName: 'Ch',
        age: 35,
        gender: 'Male',
        price: 35,
        address: 'ABC Street',
        timeSlot: {
            sessionID: 35,
            coachID: 'CoaCh',
            time: new Date()
        }
    })
    newCoach.save()
    return newCoach
}

module.exports = {
    connectDb,
    initOneCoach
}