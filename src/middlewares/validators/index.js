const { validationResult } = require('express-validator');
const authValidators = require('./auth');
const todoValidators = require('./todo');
const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

module.exports = {
  validate,
  authValidators,
  todoValidators,
};
