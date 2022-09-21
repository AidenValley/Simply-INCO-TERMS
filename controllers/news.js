const express = require('express');
const router = express.Router();
const fs = require('fs');
var axios = require("axios");

router.get('/', (req, res) => {
  res.render('news/index', {layout:false});
});

router.post('/search', (req, res) => {
  var options = {
    method: 'GET',
    url: 'https://api.newscatcherapi.com/v2/search',
    params: {q: req.body.searchTerm, lang: 'en', sort_by: 'relevancy', page: '1', topic: 'business'},
    headers: {
      'x-api-key': process.env.APIKEY
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.render('news/index', {news: response.data.articles});
  }).catch(function (error) {
    console.error(error);
    req.flash('error', 'not found');
    res.redirect('/news');
  });
})





module.exports = router;