let User = require("../models/user");
let passport = require("passport");

function getErrorMessage(err) {
  console.log("===> Erro: " + err);
  let message = "";

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = "Username already exists";
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  return message;
}

module.exports.renderSignin = function (req, res, next) {
  if (!req.user) {
    res.render("auth/signin", {
      title: "Sign-in Form",
      messages: req.flash("error") || req.flash("info"),
    });
  } else {
    console.log(req.user);
    return res.redirect("/");
  }
};

module.exports.renderSignup = function (req, res, next) {
  if (!req.user) {
    // creates a empty new user object.
    let newUser = User();

    res.render("auth/signup", {
      title: "Sign-up Form",
      messages: req.flash("error"),
      user: newUser,
    });
  } else {
    return res.redirect("/");
  }
};
module.exports.signup = async function (req, res, next) {
  let user;

  try {
    if (!req.user && req.body.password === req.body.password_confirm) {
      console.log(req.body);

      user = new User(req.body);
      console.log(user);

      await user.save();
      req.login(user, (err) => {
        if (err) throw err;
        return res.redirect("/");
      });
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    let message = getErrorMessage(err);

    req.flash("error", message);
    return res.render("auth/signup", {
      title: "Sign-up Form",
      messages: req.flash("error"),
      user: user,
    });
  }
};

module.exports.signout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports.signin = function (req, res, next) {
  passport.authenticate("local", {
    successRedirect: req.session.url || "/",
    failureRedirect: "/users/signin",
    failureFlash: true,
  })(req, res, next);
  delete req.session.url;
};
