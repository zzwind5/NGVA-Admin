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

  	$log.info(`Login request from ${username}.`);
	let result = userServ.login(username, password, req.session);
	return res.json(result);
}

/**
 * Logout
 * @param req
 * @param res
 */
userController.logout = function(req, res) {
	$log.info(`Logout request from ${req.session.user.username}`);
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
		$log.info(`User not logged in, reject the request.`)
		return res.json(result);
	}
}

/**
 * Check user permission
 * @param req
 * @param res
 * @param next
 */
userController.checkPermisson = function(req, res, next) {
	let result = userServ.checkPermission(req.session.user);
	if (result.isSuccessful()) {
		next();
	} else {
		$log.error(result.getMessage());
		return res.json(result);
	}
}

/**
 * Change current user's password
 * @param req
 * @param res
 */
userController.changePassword = function(req, res) {
	$log.info(`Change password request from ${req.session.user.username}`);
	let result = userServ.changePassword(req.session.user.username, req.body.oldPwd, req.body.newPwd)
	return res.json(result);
}

module.exports = userController;