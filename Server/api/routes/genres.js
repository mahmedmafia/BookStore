const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Genre = require('../models/genre');
const checkAuth = require('../middleware/check-auth');
router.get('/', (req, res, next) => {
  Genre.find()
    .exec()
    .then(docs => {
      res.status(200).json({ docs });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
router.post('/', checkAuth, (req, res, next) => {
  const genre = new Genre({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name
  });

  genre
    .save()
    .then(createdGenre => {
      // console.log(createdAuthor);
      res.status(200).json({ message: 'author genre', genre: createdGenre });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.delete('/:userid', checkAuth, (req, res) => {
  const id = req.params.userid;
  Genre.deleteOne({ _id: id })
    .exec()
    .then(user => {
      // console.log(user);
      res.status(200).json({ message: 'genre Deleted Successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
module.exports = router;
