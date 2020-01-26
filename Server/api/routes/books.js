const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(
      new Error('file fomat not valid,please upload a valid image format'),
      false
    );
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
router.get('/', (req, res, next) => {
  let title = req.query.title;
  console.log(req.query);
  let query = Book.find();
  var queryParam = new RegExp('' + title, 'i');
  if (title) {
    query = query.where({ title: { $regex: queryParam } });
  }
  query
    .populate('genre author')
    .exec()
    .then(books => {
      res.status(200).json({ books });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
router.get('/:bookid', (req, res, next) => {
  const id = req.params.bookid;

  Book.findById({ _id: id })
    .populate('author genre')
    .exec()
    .then(doc => {
      res.status(200).json({ doc });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
router.post('/', upload.single('file'), (req, res, next) => {
  const file = req.file;
  console.log(req.file);
  console.log(req.body);
  Author.findById({ _id: req.body.author })
    .exec()
    .then(author => {
      if (author == null) {
        return res.status(404).json({ message: 'invalid author' });
      }
      const book = new Book({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        isbn: req.body.isbn,
        genre: JSON.parse(req.body.genre),
        Image: req.file.path
      });
      return book.save();
    })
    .then(createdBook => {
      // console.log(createdAuthor);
      res.status(201).json({ message: 'book Addded', book: createdBook });
    })
    .catch(err => {
      console.log('shit');
      res.status(500).json({ error: err });
    });
});
router.patch('/:bookid', (req, res) => {
  const id = req.params.bookid;

  Book.updateOne({ _id: id }, req.body)
    .then(updatedBook => {
      res.status(200).json({
        message: 'Product Updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/books/' + id
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
router.delete('/:bookid', (req, res) => {
  const id = req.params.bookid;
  Book.deleteOne({ _id: id })
    .exec()
    .then(book => {
      // console.log(book);
      res.status(200).json({ message: 'Book Deleted Successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
module.exports = router;
