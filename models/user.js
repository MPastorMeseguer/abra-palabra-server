const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cards: { type: [Schema.Types.ObjectId] }
});

module.exports = mongoose.model("User", userSchema, "Users");;
