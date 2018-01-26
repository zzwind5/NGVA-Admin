global.$fs = require('fs');
global.$path = require('path');
global._ = require('lodash');
global.__home = $path.join(__dirname, '../');
global.$config = JSON.parse($fs.readFileSync(`${__home}/config.json`));

const log4js = require('log4js');
log4js.configure(JSON.parse($fs.readFileSync(`${__home}/resources/log4js.json`)));
global.$log = log4js.getLogger();


String.prototype.replaceAll = function (FindText, RepText) { 
		regExp = new RegExp(FindText, 'g'); 
		return this.replace(regExp, RepText); 
	};
