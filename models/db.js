const bcrypt = require('bcrypt')

const mongoose = require('mongoose')
const Coach = require('./coach')
const Trainee = require('./trainee')

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

async function initCoach(i) {
    const newCoach = new Coach({
        email: 'coach' + i + '@gmail.com',
        password: await bcrypt.hash('coach' + i, 10),
        firstName: 'Fname' + i,
        lastName: 'Lname' + i,
        age: i + 30,
        gender: 'Male',
        price: i * 100,
        address: 'Coach address ' + i,
        bookings: [],
        timeslot: []
    })
    newCoach.save()
    return newCoach
}

async function initCoaches() {
    const coach = await Coach.findOne()
    if (coach) {
        return
    }

    for (let i = 0; i < 5; i++) {
        await initCoach(i)
    }
}

async function initTrainee(i) {
    const newTrainee = new Trainee({
        email: 'trainee' + i + '@gmail.com',
        password: await bcrypt.hash('trainee' + i, 10),
        firstName: 'Fname' + i,
        lastName: 'Lname' + i,
        age: i + 15,
        gender: 'Male',
        bookings: []
    })
    newTrainee.save()
    return newTrainee
}

async function initTrainees() {
    const trainee = await Trainee.findOne()
    if (trainee) {
        return
    }

    for (let i = 0; i < 10; i++) {
        await initTrainee(i)
    }
}

async function initUsers() {
    await initCoaches()
    await initTrainees()
}

module.exports = {
    connectDb,
    initUsers
}