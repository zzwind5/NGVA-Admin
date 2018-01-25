const userServ = require('../services/userServ');

let userController = {};


/**
 * Login
 * @param req
 * @param res
 */
userController.login = function (req, res) {
	let username = _.trim(req.query.username || req.body.username || '');
  	let password = req.body.password;

	let result = userServ.login(username, password, req.session);
	return res.json(result);
}

/**
 * Logout
 * @param req
 * @param res
 */
userController.logout = function(req, res) {
	let result = userServ.logout(req.session);
	return res.json(result);
}

/**
 * CheckLogin
 * @param req
 * @param res
 * @param next
 */
userController.checkLogin = function(req, res, next) {
	let result = userServ.checkLogin(req.session);
	if (result.isSuccessful()) {
		next();
	} else {
		return res.json(result);
	}
}

/**
 * Change current user's password
 * @param req
 * @param res
 */
userController.changePassword = function(req, res) {
	let result = userServ.changePassword(req.session.user.username, req.body.oldPwd, req.body.newPwd)
	return res.json(result);
}

module.exports = userController;