
const express = require('express');
let router = express.Router();
let indexRouter = {};

//Auto scan current folder, load all routers
$fs.readdir(__dirname, function (err, files) {
  files.forEach(function (file) {
  	//ignore index.js and hidden files
    if (!_.startsWith(file, '.') && file !== 'index.js') {
      try {
		    router.use('/' + file.replace('.js', ''), require('./' + file).router);
      } catch (ex) {
		    console.error('Load router failed [' + $path.join(__dirname, file) + ']：' + ex.stack);
      }
    }
  });
});

indexRouter.router = router;
module.exports = indexRouter;