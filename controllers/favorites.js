const express = require('express');
const router = express.Router();
const fs = require('fs');
const axios = require("axios");
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

// GET Route to have favorites news
router.get('/', isLoggedIn, async (req, res) => {
  let news = await db.news.findAll()
  .then((news) => {
    res.render('news/favorites', { news: news });
  })
  .catch((error) => {
    console.log(error);
    req.flash('error', 'not found');
  });
});

// GET Route to show ejs
router.get('/:id', isLoggedIn, async (req, res) => {
  let news = await db.news.findOne({
    where: { id: req.params.id },
  })
  .then((news) => {
    // console.log(comments);
    let comments = db.comments.findAll({
      where: {newsId: req.params.id}
    }).then((comments) => {
      console.log(comments[0]);
      res.render('news/show', { comments: comments, news: news });
    })
  })
  .catch((error) => {
    console.log(error);
    req.flash('error', 'not found');
  });
});

// POST route for comments
router.post('/:id/comments', isLoggedIn, async (req, res) => {
  const createdDate = new Date().toISOString();
  let news = await db.news.findOne({
    where: { id: req.params.id },
  })
  .then((news) => {
    if (!news) throw Error();
    db.comments.create({
      name: req.body.userName,
      content: req.body.commentText,
      createdAt: createdDate,
      updatedAt: createdDate,
      newsId: news.id
    }).then(comment => {
      res.redirect(`/favorites/${req.params.id}`);
    })
  })
  .catch((error) => {
    console.log(error);
    req.flash('error', 'not found');
  })
})

// DELETE Route for News & Comments
router.delete('/:id', isLoggedIn, async (req, res) => {
  let commentsDeleted = await db.comments.destroy({
    where: { id: req.params.id }
  });
  let newsDeleted = await db.news.destroy({
    where: { id: req.params.id }
  });
  
  console.log('This is Delete Route');
  console.log('Amount of comments deleted', commentsDeleted);
  console.log('Amount of news deleted', newsDeleted);

  res.redirect('/favorites');
});

module.exports = router;