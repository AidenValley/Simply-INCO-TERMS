const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  res.render('cif/index', {layout:false});
});

module.exports = router;