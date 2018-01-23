
const express = require('express');
const userController = require('../../controllers/userCtl');
let router = express.Router();
let indexRouter = {};

//Login
router.post('/login', userController.login);



indexRouter.router = router;

module.exports = indexRouter;