const TimeSlot = require('../models/timeslot')
const Coach = require('../models/coach')
const Booking = require('../models/booking')

exports.createTimeSlot = async (req, res) => {
    const newTimeSlot = new TimeSlot({
        sessionID: req.body.sessionID,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        sessionType: req.body.sessionType
    })
    await newTimeSlot.save()

    const coach = await Coach.findById(req.user._id)
    coach.timeSlots.push({timeSlot: newTimeSlot._id})
    await coach.save()

    return newTimeSlot
}

exports.viewBookings = async (req, res) => {
    const coachId = req.user._id
    return await Booking.find({coach: coachId})
}

exports.updateTimeSlot = async (req, res) => {
    const coach = await Coach.findById(req.user._id)
    const timeSlot = await coach.timeSlots.findById(req.body.timeSlotId)

    if (timeSlot) {
        timeSlot = {
            sessionID: req.body.sessionID,
            timeStart: req.body.timeStart,
            timeEnd: req.body.timeEnd,
            sessionType: req.body.sessionType
        }

        timeSlot.save()
        return timeSlot
    } else {
        throw Error('Time slot does not exist for this coach')
    }
}

exports.acceptBooking = async (req, res) => {
    const coach = await Coach.findById(req.user._id)
    const booking = await coach.bookings.findById(req.body.bookingId)

    if (booking) {
        booking.status = 'Booked'
        booking.save()
    } else {
        throw Error('Acceptance failed')
    }
}