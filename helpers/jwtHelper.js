const jwtOptions = require('../config/jwt.config');
const jwt = require('jsonwebtoken');

module.exports = {
  validateRequest: (req, res, next) => {
    const unauthorizedResponse = res.status(401).json({ message: 'unauthorized' });
    if (req.headers["x-auth"] && req.headers["x-auth"].split(' ')[0] === 'Bearer') {
      const token = req.headers.authorization.split(' ')[1];
      return jwtHelper.verifyToken(token) ? next() : unauthorizedResponse;
    } else {
      return unauthorizedResponse;
    }
  }
};