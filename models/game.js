const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  deck: {
    type: Array,
    required: true
  },
  graveyard: {
    type: Array,
    default: []
  },
  life: {
    type: Number,
    default: 100
  },
  damage: {
    type: Number,
    default: 1
  },
  playerOne: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  playerTwo: {
    type: Schema.Types.ObjectId
  },
  originalLanguage: {
    type: String,
    required: true,
    enum: ['en', 'es']
  },
  translationLanguage: {
    type: String,
    required: true,
    enum: ['en', 'es']
  }
});

module.exports = mongoose.model('Game', gameSchema, 'Games');