const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const repository = require('../repository');
const User = repository.users;
const {
  errors: { CustomError, ...errors },
} = require('../constants');
const config = require('../config');

async function signup(name, email, password) {
  const check = await User.findOne({
    where: {
      email,
    },
  });

  if (check) {
    throw new CustomError(errors.emailAlreadyExists);
  }
  const hash = await hashPassword(password);
  const user = await User.create({
    name,
    password: hash,
    email,
  });
  const token = jwt.sign({ id: user.id }, config.jwtSecret, {
    expiresIn: config.jwtMaxAge,
  });
  return token;
}

async function login(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new CustomError(errors.userNotFound);
  }

  const isMatched = await isPasswordCorrect(password, user.password);
  if (!isMatched) {
    throw new CustomError(errors.userNotFound);
  }

  const token = jwt.sign({ id: user.id }, config.jwtSecret, {
    expiresIn: config.jwtMaxAge,
  });
  return token;
}

async function hashPassword(password) {
  return new Promise(resolve => {
    bcrypt.hash(password, 10).then(hash => {
      resolve(hash);
    });
  });
}

async function isPasswordCorrect(password, hash) {
  return new Promise(resolve => {
    bcrypt.compare(password, hash).then(result => resolve(result));
  });
}

module.exports = {
  signup,
  login,
};
