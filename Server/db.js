const mongoose = require('mongoose');
const Book = require('./api/models/book');
class DB {
  constructor() {
    mongoose
      .connect('mongodb://localhost:27017/bookStore', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(
        () => {
          // mongoose.connection.db.dropDatabase();
          // console.log(mongoose.connection.db);
        

          console.log('connected To Db bookStore');
        },
        err => {
          console.log(err);
        }
      );
  }
}
module.exports = DB;
