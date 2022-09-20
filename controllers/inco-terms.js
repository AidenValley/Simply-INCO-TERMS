const express = require('express');
const router = express.Router();
const fs = require('fs');
// app.use('/inco-terms' require('./'))

// GET ROUTES
router.get('/', (req, res) => {
  const costs = fs.readFileSync('./costs.json');
  let costsData = JSON.parse(costs); // change the json data to an array of objects
  res.render('incoterms/index', {layout:false, myCosts: costsData})
});



// router.get('/inco-terms/new', (req, res) => {
//   res.render('inco-terms/new');
// });

// // SHOW ROUTE
// router.get('/:idx', (req, res) => {
//   const costs = fs.readFileSync('./costs.json');
//   const costsData = JSON.parse(costs);
//   let costIndex = parseInt(req.params.idx);

//   res.render('incoterms/show', {layout:false}, { myCost: costsData[costIndex]});
// });

// router.use( express.static( "views" ));


module.exports = router;
