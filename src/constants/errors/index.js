const CustomError = require('./customError');
module.exports = {
  CustomError,
  nameCannotBeNull: {
    code: 1000,
    description: "'name' field can not be null",
  },
  emailIsInvalid: {
    code: 1001,
    description: "'email' field is invalid",
  },
  passwordIsInvalid: {
    code: 1002,
    description: "'password' field is invalid",
  },
  emailAlreadyExists: {
    code: 2001,
    description: 'Email already exist',
  },
};
