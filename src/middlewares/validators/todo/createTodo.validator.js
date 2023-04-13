const { body } = require('express-validator');
const errors = require('../../../constants/errors');
exports.validate = [body('title').notEmpty().withMessage(errors.titleIsInvalid)];
