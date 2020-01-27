const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const DB = require('./db');
const db = new DB();
const app = express();
// const __dirname=environment;
require('dotenv').config({ path: __dirname + '/.env' });

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

const authorRoutes = require('./api/routes/authors');
const genreRoutes = require('./api/routes/genres');
const bookRoutes = require('./api/routes/books');
const userRoutes = require('./api/routes/users');


app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/genres', genreRoutes);
app.use('/authors', authorRoutes);
// app.get('/', (request, response,next) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' });
//   response.end('Hello World Bitches');
// });
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
module.exports = app;
