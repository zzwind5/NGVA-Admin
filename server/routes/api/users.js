
const express = require('express');
const userController = require('../../src/controllers/userCtl');
let router = express.Router();
let indexRouter = {};

//Login
router.post('/login', userController.login);

//Logout
router.get('/logout', userController.logout);

//Check whether login
router.use(userController.checkLogin);

//Change password
router.post('/changePwd', userController.changePassword);


indexRouter.router = router;
module.exports = indexRouter;