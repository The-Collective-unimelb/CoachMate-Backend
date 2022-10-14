const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const Trainee = require('./models/trainee')
const Coach = require('./models/coach')

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, { _id: user._id, role: user.role })
    })

    passport.deserializeUser((login, done) => {
        if (login.role === 'athlete') {
            Trainee.findById(login._id, (err, user) => {
            return done(err, { ...user.toObject(), role: 'athlete' })
            });
        } else if (login.role === 'coach') {
            Clinician.findById(login._id, (err, user) => {
            return done(err, { ...user.toObject(), role: 'coach' })
            });
        } else {
            return done('This user does not have role', null)
        }
    })

    passport.use(
        'trainee-login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            (req, email, password, done) => {
                process.nextTick(() => {
                    Trainee.findOne({ email }, async (err, trainee) => {
                        if (err) {
                            return done(err);
                        } else if (!trainee) {
                            return done(
                                null,
                                false,
                                req.flash('loginMessage', 'No user found.'),
                            );
                        } else if (!(await bcrypt.compare(password, trainee.password))) {
                            return done(
                                null,
                                false,
                                req.flash('loginMessage', 'Failed! Wrong password.'),
                            );
                        } else {
                            return done(
                                null,
                                { ...trainee.toObject(), role: 'trainee' },
                                req.flash('loginMessage', 'Login successful'),
                            );
                        }
                    });
                });
            },
        ),
    );
    
      passport.use(
            'coach-login',
            new LocalStrategy(
                {
                    usernameField: 'email',
                    passwordField: 'password',
                    passReqToCallback: true,
                },
                (req, email, password, done) => {
                    process.nextTick(() => {
                        Coach.findOne({ email }, async (err, coach) => {
                            if (err) {
                            return done(err);
                            } else if (!coach) {
                            return done(
                                null,
                                false,
                                req.flash('loginMessage', 'No user found.'),
                            );
                            } else if (!(await bcrypt.compare(password, coach.password))) {
                            return done(
                                null,
                                false,
                                req.flash('loginMessage', 'Failed! Wrong password.'),
                            );
                            } else {
                            return done(
                                null,
                                { ...coach.toObject(), role: 'coach' },
                                req.flash('loginMessage', 'Login successful'),
                            );
                            }
                        });
                    });
                },
            ),
        );
}