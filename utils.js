function coachIsLoggedIn(req, res, next) {
  if (req.user) {
    if (req.user.role == "coach") {
      return next();
    } else {
      res.redirect("/");
      return;
    }
  }
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
  res.redirect("/login");
}

function athleteIsLoggedIn(req, res, next) {
  if (req.user) {
    if (req.user.role == "trainee") {
      return next();
    } else {
      res.redirect("/coach-dashboard");
      return;
    }
  }
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
  res.redirect("/login");
}

module.exports = {
  coachIsLoggedIn,
  athleteIsLoggedIn,
};
