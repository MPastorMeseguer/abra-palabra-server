const Card = require('../models/card');

module.exports = {
  create: (req, res) => {
    const {
      word,
      translation,
      wrongAnswers,
      author,
      originalLanguage,
      translationLanguage
    } = req.body;
    if (
      !word ||
      !translation ||
      !wrongAnswers ||
      !author ||
      !originalLanguage ||
      !translationLanguage
    ) return res.status(422).json({ message: 'Missing information' });

    new Card({ ...req.body })
      .save()
      .then(card => res.status(201).json({ message: 'Donezio!' }))
      .catch(e => {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong' })
      });
  },
  get: (req, res) => {
    Card.findOne({ id: req.params.id })
      .then(card => {
        if (!card) return res.status(404).json({ message: 'Card does not exist' })
        return res.status(200).json({ message: 'Ok', card })
      })
      .catch(e => res.status(500).json({ message: 'Something went wrong' }));
  }
}