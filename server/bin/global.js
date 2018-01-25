global.$fs = require('fs');
global.$path = require('path');
global._ = require('lodash');
global.__home = $path.join(__dirname, '../');
global.$config = JSON.parse($fs.readFileSync(`${__home}config.json`));
