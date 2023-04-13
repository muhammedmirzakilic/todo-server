const { body } = require('express-validator');
const errors = require('../../../constants/errors');
exports.validate = [
  body('name').notEmpty().isString().withMessage(errors.nameCannotBeNull),
  body('email').isEmail().withMessage(errors.emailIsInvalid),
  body('password').isLength({ min: 6 }).withMessage(errors.passwordIsInvalid),
];
