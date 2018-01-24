const serviceServ = require('../services/serviceServ');

let serviceController = {};


/**
 * Get system services status
 * @param req
 * @param res
 */
serviceController.getStatus = function(req, res){
	serviceServ.getStatus(res);
}

/**
 * Restart all system services
 * @param req
 * @param res
 */
serviceController.restartAll = function(req, res) {
	let result = serviceServ.restartAll(req.session.user);
	return res.json(result);
}


module.exports = serviceController;