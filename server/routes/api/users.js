
const express = require('express');
const userController = require('../../src/controllers/userCtl');
let router = express.Router();
let indexRouter = {};

//Login
router.post('/login', userController.login);

//Logout
router.get('/logout', userController.logout);

//Check login status
router.use(userController.checkLogin);
/** Readonly API Start **************************************************************************** */

//Change password
router.post('/changePwd', userController.changePassword);

/** Readonly API End ****************************************************************************** */



indexRouter.router = router;
module.exports = indexRouter;