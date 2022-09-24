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


module.exports = router;