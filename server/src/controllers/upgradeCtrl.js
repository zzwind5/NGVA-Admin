// const upgradeServ = require('../services/upgradeServ');
const formidable = require('formidable');

let upgradeController = {};

/**
 * Upgrade system
 * @param req
 * @param res
 */
upgradeController.upgrade = function(req, res){
	var form = new formidable.IncomingForm();
	form.uploadDir='D:/Temp/upload/tmp';

	form.on('error', function(error) {
		$log.error(error);
	})
	.on('file', function(field, file) {
		console.log(file);
		$fs.rename(file.path, `D:/Temp/upload/${file.name}`);
		// TODO callback;
	})
	.on('end', function(){
		console.log('Upload finished.');
	})

	form.parse(req);

	res.json({errorCode: 0, msg:'Success'});
}


module.exports = upgradeController;