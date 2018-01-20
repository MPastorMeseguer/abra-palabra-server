const validator = require('email-validator');
const jwt = require('jsonwebtoken');

const jwtOptions = require('../config/jwt.config');
const jwtHelper = require('../helpers/jwt.helper');

const User = require('../models/user');

module.exports = {
  signup: (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !password || !email) return res.status(403).json({ message: "Provide username, email and password" });

    User.findOne({ $or: [{ 'username': username }, { 'email': email }] })
      .then(user => {
        if (user) return Promise.reject(new Error('There is already a user with those credentials'));
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
        return new User({ username, email, password: hashPass }).save();
      }).then(user => {
        const token = jwt.sign({ id: user._id }, jwtOptions.secret, { expiresIn: 100000 });
        return res.status(200).json({ message: "ok", token });
      }).catch(err => {
        if (err.message === 'There is already a user with those credentials') {
          res.status(422);
        } else res.status(500);
        return res.json({ message: err.message })
      });
  },
  login: (req, res) => {
    const { identification, password } = req.body;
    const searchValue = validator.validate(identification) ? 'email' : 'username';
    const query = {};
    query[searchValue] = identification;
    if (identification === '' || password === '') return res.status(400).json({ message: "Provide identification" });

    User.findOne(query)
      .then(user => {
        if (!user) return Promise.reject(new Error('There is no user with those credentials'));
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (!isMatch) return Promise.reject(new Error('Wrong password'));
          const token = jwt.sign({ id: user._id }, jwtOptions.secret, { expiresIn: 100000 });
          return res.status(200).json({ message: "ok", token });
        });
      }).catch(err => {
        if (err.message === 'There is already a user with those credentials') {
          res.status(422);
        } else if (err.message === 'Wrong password') {
          res.status(401);
        } else res.status(500);
        return res.json({ message: err.message || 'Serverside error' })
      });
  },
  token: async (req, res) => {
    const validToken = await jwtHelper.verifyToken(res, req.headers.token);
    if (!validToken) return res.status(401).json({ message: 'Invalid token' });
    return res.status(200).json({ message: 'Valid token' });
  },
};
