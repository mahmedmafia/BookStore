const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const genreSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true }
});
module.exports = mongoose.model('Genre', genreSchema);
