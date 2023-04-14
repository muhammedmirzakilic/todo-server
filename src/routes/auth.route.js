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
  try {
    const token = await authService.signup(name, email, password);
    res.status(201).json({
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', validate(loginValidator.validate), async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    res.status(200).json({
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
