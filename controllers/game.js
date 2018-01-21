const ObjectId = require('mongoose').Types.ObjectId;

const Game = require('../models/game');
const User = require('../models/user');
const Card = require('../models/card');

module.exports = {
  singlesInit: async (req, res) => {
    const userId = req.params.userId;
    const originalLanguage = req.body.originalLanguage;
    const translationLanguage = req.body.translationLanguage;

    const userCards = await User.findOne({ _id: userId }, { _id: 0, ignoredCards: 1 });
    const cardsToIgnore = userCards.ignoredCards.map(id => new ObjectId(id));

    const newDeck = await Card.aggregate([
      {
        $match: {
          _id: {
            $not: {
              $in: cardsToIgnore
            }
          },
          originalLanguage: originalLanguage,
          translationLanguage: translationLanguage
        }
      },
      { $sample: { size: 10 } }
    ]);

    const game = await new Game({
      deck: newDeck,
      graveyard: [],
      life: 100,
      damage: 1,
      playerOne: ObjectId(userId),
      originalLanguage,
      translationLanguage
    }).save();
    return res.status(200).json({ game })
  },
  refill: async (req, res) => {
    const game = req.body.game;
    const gameId = req.params.gameId;

    if (!game) return res.status(422).json({ message: 'Please provide a game object' });

    const userOneId = game.playerOne;
    const userTwoId = game.playerTwo;

    const ignoredCards = game.graveyard.slice();
    ignoredCards.push(await User.findOne({ id: userOneId }, { _id: 0, ignoredCards: 1 }).ignoredCards);
    if (userTwoId) {
      ignoredCards.push(await User.findOne({ id: userTwoId }, { _id: 0, ignoredCards: 1 }).ignoredCards);
    }

    game.deck = await Card.aggregate([
      {
        $match: {
          _id: {
            $not: {
              $in: ignoredCards
            }
          },
          originalLanguage: game.originalLanguage,
          translationLanguage: game.translationLanguage
        }
      },
      { $sample: { size: 10 } }
    ]);
    const updatedGame = await Game.findOneAndUpdate({ _id: gameId }, game, { returnOriginal: false });
    if (updatedGame) return res.status(200).json({ game });
  }
}