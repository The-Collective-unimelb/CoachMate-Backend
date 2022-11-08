const Coach = require('../models/coach')
const Booking = require('../models/booking')

exports.viewBookings = async (req, res) => {
    const coachId = req.user._id
    return await Booking.find({coach: coachId})
}

exports.acceptBooking = async (req, res) => {
    const coach = await Coach.findById(req.user._id)
    const booking = await coach.bookings.findById(req.body.bookingId)

    if (booking) {
        booking.status = 'Booked'
        await booking.save()
    } else {
        throw Error('Acceptance failed')
    }
}