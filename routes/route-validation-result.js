const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new Error(errors.array().map(err => `${err.param}: ${err.msg}`).join(', ')));
  }
  return next();
};
