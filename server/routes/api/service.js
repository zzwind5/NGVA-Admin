const express = require('express');
let router = express.Router();
const serviceController = require('../../src/controllers/serviceCtl');
const userController = require('../../src/controllers/userCtl');

let indexRouter = {};


//Check whether login
router.use(userController.checkLogin);

//Get all services status
router.get('/getStatus', serviceController.getStatus);

//restart all services status
router.get('/restartAll', serviceController.restartAll);


indexRouter.router = router;
module.exports = indexRouter;