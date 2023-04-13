const express = require('express');
const router = express.Router();
const { authService } = require('../services');
const {
  validators: {
    validate,
    authValidators: { signupValidator, loginValidator },
  },
} = require('../middlewares');
const config = require('../config');

router.post('/signup', validate(signupValidator.validate), async (req, res, next) => {
  const { name, email, password } = req.body;
  const token = await authService.signup(name, email, password);
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: config.jwtMaxAge * 1000,
  });
  res.status(201).send();
});

router.post('/login', validate(loginValidator.validate), async (req, res, next) => {
  const { email, password } = req.body;
  const token = await authService.login(email, password);
  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: config.jwtMaxAge * 1000,
  });
  res.status(201).json({
    token,
  });
});

module.exports = router;
