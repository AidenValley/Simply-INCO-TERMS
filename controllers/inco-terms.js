let express = require('express');
let router = express.Router();
const app = express();
const port = 8001;
// app.use('/inco-terms' require('./'))


router.get('/', (req, res) => {
  res.render('incoterms/index', {layout:false});
});




module.exports = router;
