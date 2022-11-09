const Coach = require('../models/coach')
const Booking = require('../models/booking')
const Trainee = require('../models/trainee')

exports.bookSession = async (req, res) => {
    if (!USER) {
        res.redirect('/login')
    }
    const athleteId = USER.id
    const athlete = await Trainee.findById(athleteId)
    const coachId = (await Coach.findOne({email: req.body.coachEmail}))._id
    const coach = await Coach.findById(coachId)
    const sessionTime = req.body.sessionTime
    const sessionDate = req.body.sessionDate
    console.log("athlete: ", athlete)
    console.log("coach", coach)

    const newBooking = new Booking({
        sessionTime: sessionTime,
        sessionDate: sessionDate,
        coach: coachId,
        location: req.body.location,
        price: req.body.price,
        status: 'Pending'
    })
    newBooking.trainees.push(athlete)
    await newBooking.save()

    await athlete.bookings.push(newBooking)
    await athlete.save()
    await coach.bookings.push(newBooking)
    await coach.save()
    console.log("booking", newBooking)
}

exports.updateProfile = async (req, res) => {
    const athlete = await Trainee.findById(req.body.id)
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
    const athleteId = USER.id
    return await Booking.find({trainee: athleteId})
}

exports.cancelBooking = async (req, res) => {
    const athlete = await Coach.findById(USER.id)
    const booking = await athlete.bookings.findById(req.body.bookingId)

    if (booking) {
        booking.status = 'Cancelled'
        await booking.save()
    } else {
        throw Error('Cancel failed')
    }
}