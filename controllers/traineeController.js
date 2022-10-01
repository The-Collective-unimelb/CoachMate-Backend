const TimeSlot = require('../models/timeslot')
const Coach = require('../models/coach')
const Booking = require('../models/booking')
const Trainee = require('../models/trainee')

exports.bookSession = async (req, res) => {
    const athleteId = req.user._id
    const athlete = await Trainee.findById(athleteId)
    const coachId = req.body.coachId
    const coach = await Coach.findById(coachId)
    const timeSlotId = req.body.timeSlotId

    const newBooking = new Booking({
        session: timeSlotId,
        coach: coachId,
        location: req.body.location,
        price: req.body.price,
        status: 'Pending'
    })
    newBooking.trainees.push(athleteId)
    await newBooking.save()

    await Trainee.findById(athleteId).bookings.push(newBooking._id)
    await athlete.save()
    await Coach.findById(coachId).bookings.push(newBooking._id)
    await coach.save()
}

exports.updateProfile = async (req, res) => {
    const athlete = await Trainee.findById(req.user._id)
    const body = req.body
    athlete.firstName = body.firstName
    athlete.lastName = body.lastName
    athlete.age = body.age
    athlete.gender = body.gender
    athlete.password = await bcrypt.hash(body.password, 10)

    if (await Trainee.findOne({email: body.email})) {
        throw Error('Email is already registered')
    } else {
        athlete.email = body.email
    }

    await athlete.save()
}

exports.viewBookings = async (req, res) => {
    const athleteId = req.user._id
    return await Booking.find({trainee: athleteId})
}

exports.cancelBooking = async (req, res) => {
    const athlete = await Coach.findById(req.user._id)
    const booking = await athlete.bookings.findById(req.body.bookingId)

    if (booking) {
        booking.status = 'Cancelled'
        await booking.save()
    } else {
        throw Error('Cancel failed')
    }
}