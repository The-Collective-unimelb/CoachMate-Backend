const bcrypt = require('bcrypt')
const Coach = require('../models/coach')
const Trainee = require('../models/trainee')

exports.register = async (req, res) => {
    try {
        const body = req.body

        if (body.password !== body.confirmPassword) {
            throw Error('Password is not same with confirm password');
        }

        if (body.role == 'Athelete') {
            if (await Trainee.findOne({email: body.email})) {
                throw Error('This email is already registered')
            }

            const newTrainee = new Trainee({
                email: body.email,
                password: await bcrypt.hash(body.password, 10),
                firstName: body.firstName,
                lastName: body.lastName,
                age: body.age,
                gender: body.gender,
                bookings: []
            })

            await newTrainee.save()
            req.flash('successfulMessage', 'Successfully Registered')
            res.redirect('/signup')
        } else if (body.role == 'Coach') {
            if (await Coach.findOne({email: body.email})) {
                throw Error('This email is already registered')
            }

            const newCoach = new Coach({
                email: body.email,
                password: await bcrypt.hash(body.password, 10),
                firstName: body.firstName,
                lastName: body.lastName,
                age: body.age,
                gender: body.gender,
                price: 0,
                address: 'None',
                bookings: [],
                timeSlot: []
            })

            await newCoach.save()
            req.flash('successfulMessage', 'Successfully Registered')
            res.redirect('/signup')
        }
        
    } catch (err) {
        req.flash('Register Error', 'Register Failed')
        res.redirect('/signup')
    }
}