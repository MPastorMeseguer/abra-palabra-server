const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  word: { type: String, required: true },
  translation: { type: String, required: true },
  wrongAnswers: {type: [String] },
  author: { type: Schema.Types.ObjectId, required: true },
  language: { type: String, required: true, enum: ['en', 'es'] },
  translateLanguage: { type: String, required: true, enum: ['en', 'es'] }
});

module.exports = mongoose.model("Card", cardSchema, "Cards");
