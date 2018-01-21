const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  ignoredCards: {
    type: [Schema.Types.ObjectId],
    default: []
  }
});

module.exports = mongoose.model('User', userSchema, 'Users');;
