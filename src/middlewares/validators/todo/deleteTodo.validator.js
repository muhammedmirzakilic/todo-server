const { param } = require('express-validator');
const errors = require('../../../constants/errors');
exports.validate = [param('id').isNumeric().withMessage(errors.idIsInvalid)];
