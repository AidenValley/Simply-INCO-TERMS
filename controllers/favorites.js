const express = require('express');
const router = express.Router();
const fs = require('fs');
const axios = require("axios");
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, async (req, res) => {
  let news = await db.news.findAll();
  // where: {
  //   id: req.user.id
  // }
  console.log(news);
  res.render('news/favorites', { news: news });
});

router.delete('/:id', isLoggedIn, async (req, res) => {
  let newsDeleted = await db.news.destroy({
    where: { id: req.params.id }
  });
  console.log('This is Delete Route');
  console.log('Amount of newss deleted', newsDeleted);

  res.redirect('/favorites');
});

// GET Route to show ejs
router.get('/:id', isLoggedIn, async (req, res) => {
  let news = await db.news.findOne({
    where: { id: req.params.id },
  })
  .then((news) => {
    console.log(news);
    res.render('news/show', { news: news });
  })
  .catch((error) => {
    console.log(error);
    req.flash('error', 'not found');
  });
});

router.post('/:id/comments', isLoggedIn, async (req, res) => {
  const createdDate = new Date().toISOString();
  let news = await db.news.findOne({
    where: { id: req.params.id },
    include: [db.comments]
  })
  .then((news) => {
    db.comment.create({
      name: req.body.userName,
      content: req.body.commentText,
      createdAt: createdDate,
      updatedAt: createdDate,
      userId: req.user.id
    }).then(comment => {
      res.redirect(`/favorites/${req.params.id}`);
    })
  })
  .catch((error) => {
    console.log(error);
  })
})


module.exports = router;