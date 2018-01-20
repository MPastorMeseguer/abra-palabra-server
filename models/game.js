const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  damageCount: { type: String, required: true },
  usedCards: { type: [Schema.Types.ObjectId] },
  deck: { type: [Schema.Types.ObjectId], required: true },
  remainingLife: { type: Number, default: 100, required: true },
});

module.exports = mongoose.model("Game", gameSchema, "Games");