const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  res.render('ddp/index', {layout:false});
});

module.exports = router;