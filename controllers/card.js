const Card = require('../models/card');

module.exports = {
  create: (req, res, next) => {
    const {word, translation, wrongAnswers} = req.body;
  },
}