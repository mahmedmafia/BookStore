const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
 Image: { type: String ,required:true}
});
// bookSchema.add( );
// console.log(bookSchema);
module.exports = mongoose.model('Book', bookSchema);
