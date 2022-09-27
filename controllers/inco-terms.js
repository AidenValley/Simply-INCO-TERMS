const express = require('express');
const router = express.Router();
const fs = require('fs');


// GET ROUTES
router.get('/', (req, res) => {
  const costs = fs.readFileSync('./costs.json');
  let costsData = JSON.parse(costs); // change the json data to an array of objects
  res.render('incoterms/index', { myCosts: costsData})
});

module.exports = router;
