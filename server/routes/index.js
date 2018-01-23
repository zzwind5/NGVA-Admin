var express = require('express');
var router = express.Router();
let indexRouter = {};

// Access api interface
router.use('/api', require('./api/index').router);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Expres hh' });
});

indexRouter.router = router;

module.exports = indexRouter;
