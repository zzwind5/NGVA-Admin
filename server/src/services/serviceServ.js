const {ErrorRep, SuccessRep} = require('../model/rep/response');
const {isAdminUser} = require('./userServ');
const _Promise = require('bluebird');
const {exec} = require('child_process');

const services = ["elasticsearch", "ignite", "redis", "rabbitmq-server", "nginx", "postgresql-9.3", 
	"aerohive-tomcat", "aerohive-tomcat_2", "aerohive-tomcat_3", "aerohive-tomcat_4", "capwap-tunnel"];
const ACTIVE_KEY = 'ActiveState';
let serviceServ = {};


/**
 * Get system services status
 */
serviceServ.getStatus = function(response) {
	check_services(response);
}

/**
 * Restart all system services
 */
serviceServ.restartAll = function(user){
	if (isAdminUser(user)) {
		return new SuccessRep();
	} else {
		return new ErrorRep(40006, 'Permission deny.')
	}
}

function check_status(service){
    return new _Promise(function(resolve, reject){
        let proc = exec(`systemctl show ${service} | grep ${ACTIVE_KEY}`);
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

function check_services(response) {
	let data = {};
    _Promise.map(services, check_status).then(function(res){
        _.forEach(services, function(service, i){
            data[services] = res[i][ACTIVE_KEY];
        });
        response.json(new SuccessRep(data));
    }).catch(function(error) {
        response.json(new ErrorRep(40011, 'Get service status failed'));
    });
}


module.exports = serviceServ;