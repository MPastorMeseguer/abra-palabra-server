const validator = require('email-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const jwtOptions = require('../config/jwt.config');
const jwtHelper = require('../helpers/jwt.helper');

const User = require('../models/user');

module.exports = {
  signup: (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body)
    if (!username || !password || !email) return res.status(403).json({ message: "Provide username, email and password" });

    User.findOne({ $or: [{ 'username': username }, { 'email': email }] })
      .then(user => {
        if (user) return Promise.reject(new Error('There is already a user with those credentials'));
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
        return new User({ username, email, password: hashPass }).save();
      }).then(user => {
        const token = jwt.sign({ id: user._id }, jwtOptions.secret, { expiresIn: 100000 });
        return res.status(200).json({ user: user._id, token });
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
          if (!isMatch) return Promise.reject(new Error('Wrong password'))
            .catch(error => {
              return res.status(401).json({ message: error.message })
            });
          const token = jwt.sign({ id: user._id }, jwtOptions.secret, { expiresIn: 100000 });
          return res.status(200).json({ user: user._id, token });
        });
      }).catch(err => {
        if (err.message === 'There is already a user with those credentials') {
          res.status(422);
        } else res.status(500);
        return res.json({ message: err.message || 'Serverside error' })
      });
  },
  token: async (req, res) => {
    return await jwtHelper.verifyToken(res, req.headers.token) ?
      res.status(401).json({ message: 'Invalid token' }) :
      res.status(200).json({ message: 'Valid token' });
  },
};
