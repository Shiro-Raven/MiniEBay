var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  User = mongoose.model('User');

module.exports.signUp = function (req, res, next) {
  var valid =
    req.body.fullName &&
    Validations.isString(req.body.fullName) &&
    req.body.emailAddress &&
    Validations.isString(req.body.emailAddress) &&
    req.body.password &&
    Validations.isString(req.body.password);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'Full name, email, and password are required fields.',
      data: null
    });
  }

  User.findOne({ emailAddress: req.body.emailAddress }).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.status(422).json({
        err: null,
        msg: 'The email you signed up with already exists. You should login',
        data: null
      });
    } else {
      User.create(req.body, function (err, user) {
        if (err) {
          return next(err);
        }
        res.status(201).json({
          err: null,
          msg: 'User was created successfully.',
          data: user
        });
      });
    }
  });
};

module.exports.login = function (req, res, next) {
  if (!Validations.isString(req.body.emailAddress)) {
    return res.status(422).json({
      err: null,
      msg: 'Email parameter must be a valid email address.',
      data: null
    });
  }

  if (!Validations.isString(req.body.password)) {
    return res.status(422).json({
      err: null,
      msg: 'Password parameter must be a valid password.',
      data: null
    });
  }

  User.findOne({
    emailAddress: req.body.emailAddress,
    password: req.body.password
  })
    .exec(function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res
          .status(404)
          .json({ err: null, msg: `User not found. ${req.body.emailAddress}: ${req.body.password}`, data: null });
      }
      return res.status(200).json({
        err: null,
        msg: 'User retrieved successfully.',
        data: user
      });
    });
};