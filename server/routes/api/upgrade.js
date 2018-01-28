const express = require('express');
let router = express.Router();
const upgradeController = require('../../src/controllers/upgradeCtrl');
const userController = require('../../src/controllers/userCtl');

let indexRouter = {};


//Check login status
router.use(userController.checkLogin);
/** Readonly API Start **************************************************************************** */

/** Readonly API End ****************************************************************************** */



//Check permission, from this line all API need administrator permission.
router.use(userController.checkPermisson);
/** Writeable API Start *************************************************************************** */

//Get all services status
router.post('/start', upgradeController.upgrade);

/** Writeable API End ***************************************************************************** */


indexRouter.router = router;
module.exports = indexRouter;