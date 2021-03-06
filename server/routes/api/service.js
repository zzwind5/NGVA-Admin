const express = require('express');
let router = express.Router();
const serviceController = require('../../src/controllers/serviceCtl');
const userController = require('../../src/controllers/userCtl');

let indexRouter = {};


//Check login status
router.use(userController.checkLogin);
/** Readonly API Start **************************************************************************** */

//Get all services status
router.get('/getStatus', serviceController.getStatus);

/** Readonly API End ****************************************************************************** */




//Check permission, from this line all API need administrator permission.
router.use(userController.checkPermisson);
/** Writeable API Start *************************************************************************** */

//restart all services status
router.get('/restartAll', serviceController.restartAll);

/** Writeable API End ***************************************************************************** */


indexRouter.router = router;
module.exports = indexRouter;