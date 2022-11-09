function coachIsLoggedIn(req, res, next) {
  if (USER) {
    if (USER.role == "coach") {
      return next();
    } else {
      res.redirect("/");
      return;
    }
  }
  USER = null
  res.redirect('/')
}

function athleteIsLoggedIn(req, res, next) {
  if (USER) {
    if (USER.role == "athlete") {
      return next();
    } else {
      res.redirect("/coach-dashboard");
      return;
    }
  }
  USER = null
  res.redirect('/')
}

module.exports = {
  coachIsLoggedIn,
  athleteIsLoggedIn,
};
