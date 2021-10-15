const User = require("../models/user");
const passport = require("passport");
exports.hello = async function (req, res) {
  res.send("hello");
};
exports.login = function (req, res, next) {
  if (!req.body.email) {
    return res.status(422).json({ errors: { email: "can't be blank" } });
  }

  if (!req.body.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate(
    "local",
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }

      if (user) {
        user.token = user.generateJWT();
        return res.json({ user: user.toAuthJSON() });
      } else {
        return res.status(422).json(info);
      }
    }
  )(req, res, next);
};
exports.signUp = function (req, res, next) {
  console.log(req.body);
  var user = new User();

  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user
    .save()
    .then(function () {
      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
};
