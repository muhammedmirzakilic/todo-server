const config = require('../config');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) res.sendStatus(403);
  const bearer = authorization.split(' ');
  const bearerToken = bearer[1];
  try {
    const { id } = jwt.verify(bearerToken, config.jwtSecret);
    req.userId = id;
  } catch (err) {
    return res.sendStatus(403);
  }

  next();
}

module.exports = verifyToken;
