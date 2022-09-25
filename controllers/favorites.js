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
  // console.log(news);
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

router.post('/:id/comments', isLoggedIn, async (req, res) => {
  const createdDate = new Date().toISOString();
  let news = await db.news.findOne({
    where: { id: req.params.id },
    // include: [db.news, db.users]
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
  })
})

// app.put('/:id/comments', isLoggedIn, async (req, res) => {
//   const usersUpdated = await db.user.update({
//       name: req.body.name,
//     }, {
//       where: {
//         id: req.params.id
//       }
//   })
// })


module.exports = router;