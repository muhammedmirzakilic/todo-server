const { body } = require('express-validator');
const errors = require('../../../constants/errors');
exports.validate = [
  body('email').isEmail().withMessage(errors.emailIsInvalid),
  body('password').notEmpty().withMessage(errors.passwordIsInvalid),
];
