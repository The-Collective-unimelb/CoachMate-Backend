const bcrypt = require('bcrypt')
const Coach = require('../models/coach')
const Trainee = require('../models/trainee')

exports.register = async (req, res) => {
    try {
        const id = req.user._id
        const body = req.body
        const role = body.role
        
    } catch (err) {
        req.flash('Register Error', err.message)
        res.redirect('/signup')
    }
}