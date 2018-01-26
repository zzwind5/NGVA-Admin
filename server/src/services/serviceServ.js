const {ErrorRep, SuccessRep} = require('../model/rep/response');
const {isAdminUser} = require('./userServ');
const _Promise = require('bluebird');
const {exec} = require('child_process');

const ACTIVE_KEY = 'ActiveState';
let serviceServ = {};


/**
 * Get system services status
 */
serviceServ.getStatus = async function() {
	let result = await check_services();
    return result;
}

/**
 * Restart all system services
 */
serviceServ.restartAll = function(user){
	if (isAdminUser(user)) {
		return new SuccessRep();
	} else {
		return new ErrorRep("user.permission.deny");
	}
}

function check_status(service){
    return new _Promise(function(resolve, reject){
        let proc = exec(`sudo systemctl show ${service} | grep ${ACTIVE_KEY}`);
        proc.stdout.on('data', function(data){
            let res = {};
            _.forEach(data.split("\n"), function(line){
            	if (line.length === 0) {
            		return;
            	}
                let items = line.split("=");
                res[items[0]] = items[1];
            });
            resolve(res);
        });
        proc.stderr.on('data', function(data){
            reject(data);
        });
    });
}

const check_services = async function() {
	let data = {};
    let result = {};
    await _Promise.map($config.services, check_status).then(function(res){
        _.forEach($config.services, function(serv, i){
            data[serv] = res[i][ACTIVE_KEY];
        });
        result = new SuccessRep(data);
    }).catch(function(error) {
        console.error(error);
        result = new ErrorRep("service.getStatus.failed");
    });

    return result;
}


module.exports = serviceServ;