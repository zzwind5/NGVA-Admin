const userServ = require('../services/userServ');

let userController = {};


/**
 * Login
 * @param req
 * @param res
 */
userController.login = function (req, res) {
	return userServ.login(req, res);
}

module.exports = userController;