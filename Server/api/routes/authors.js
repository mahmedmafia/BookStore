const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
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
  Author.find()
    .exec()
    .then(docs => {
      res.status(200).json({ docs });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
router.post('/', upload.single('file'), (req, res, next) => {


  const birthDate = req.body.date_of_birth;
  const deathDate = req.body.date_of_death;
  const author = new Author({
    _id: mongoose.Types.ObjectId(),
    last_name: req.body.last_name,
    date_of_birth: birthDate,
    date_of_death: deathDate,
    first_name: req.body.first_name,
    Image:req.file.path,
  });
  if (req.body.books) {
    for (let i = 0; i < req.body.books.length; i++) {
      author.books.push(req.body.books[i]);
    }
  }

  console.log(author);
  author
    .save()
    .then(createdAuthor => {
      // console.log(createdAuthor);
      res.status(200).json({ message: 'author Addded', author: createdAuthor });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
router.patch('/:authorid', (req, res) => {
  const id = req.params.authorid;

  Author.updateOne({ _id: id }, req.body)
    .then(updatedBook => {
      res.status(200).json({
        message: 'Author Updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/authors/' + id
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
module.exports = router;
