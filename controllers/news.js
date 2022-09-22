const express = require('express');
const router = express.Router();
const fs = require('fs');
const axios = require("axios");
const db = require('../models');

router.get('/', (req, res) => {
  res.render('news/index', {news: null});
});

router.post('/search', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://api.newscatcherapi.com/v2/search',
    params: {q: req.body.searchTerm, lang: 'en', sort_by: 'relevancy', page: '1', topic: 'business'},
    headers: {
      'x-api-key': process.env.APIKEY
    }
  };
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.render('news/index', { news: response.data.articles});
  }).catch(function (error) {
    console.error(error);
    req.flash('error', 'not found');
    res.redirect('/news');
  });
})

router.post('/favorites', (req, res) => {
  const date = new Date().toISOString();
  db.news.create({
    title: req.body.title,
    summary: req.body.summary,
    author: req.body.author,
    createdAt: date,
    updatedAt: date
  }).then(function (news) {
    res.render('news/favorites');
  }).catch(function (error) {
    req.flash('error', 'cannot add');
    res.redirect('/news');
  })
})





module.exports = router;