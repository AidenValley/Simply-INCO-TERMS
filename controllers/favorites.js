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
})
router.get('/:id', isLoggedIn, async (req, res) => {
  let news = await db.news.findOne({
    where: { id: req.params.id },
  })
  .then((news) => {
    console.log(news);
    res.render('news/show', { news: news })
  })
  .catch((error) => {
    console.log(error);
    req.flash('error', 'not found');
  })
});

router.delete('/:id', isLoggedIn, async (req, res) => {
  let newsDeleted = await db.news.destroy({
    where: { id: req.params.id }
  });
  console.log('This is Delete Route');
  console.log('Amount of newss deleted', newsDeleted);

  res.redirect('/favorites');
})



module.exports = router;