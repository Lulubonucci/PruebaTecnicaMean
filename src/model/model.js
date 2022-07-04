const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Feed = new Schema({
  title: String,
  body: String,
  image: String,
  source: String,
  publisher: String,
});

module.exports = mongoose.model("periodicos", Feed);
