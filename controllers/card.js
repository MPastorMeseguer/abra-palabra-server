const Card = require('../models/card');

module.exports = {
  create: (req, res, next) => {
    const {
      word,
      translation,
      wrongAnswers,
      author,
      language,
      translateLanguage
    } = req.body;
    if (!word ||
      !translation ||
      !wrongAnswers ||
      !author ||
      !language ||
      !translateLanguage) return res.status(422).json({ message: 'Missing information' });
    new Card({...req.body})
      .save()
      .then(card => res.status(201).json({message: 'Donezio!'}))
      .catch(e => res.status(500).json({message: 'Something went wrong'}));
  },
}