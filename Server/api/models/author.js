const mongoose = require('mongoose');

var Schema=mongoose.Schema;

var AuthorSchema = new Schema({
    _id:Schema.Types.ObjectId,
  first_name: { type: String, required: true, max: 100 },
  last_name: { type: String, required: true, max: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
  Image: { type: String ,required:true},
  books: [{type: Schema.Types.ObjectId, ref: 'Book'}]
});


module.exports=mongoose.model('Author',AuthorSchema);