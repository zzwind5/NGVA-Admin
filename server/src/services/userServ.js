const {ErrorRep, SuccessRep} = require('../model/rep/response');
const crypto = require('crypto');

const SECRET_TYPE = 'sha256';
const SECRET = 'shq2!`fh953(^mnr';

let userService = {};


/**
 * Login
 * @param req
 * @param res
 * @param session
 */
userService.login = function (username, password, session) {

  let checkRes = checkUser(username, password);
  if (!checkRes.isSuccessful()) {
    return checkRes;
  }

  //check password
  let passwordEncrypted = encrypt(password);
  let user = checkRes.getResult();
  if (user.password === passwordEncrypted) {
    session.user = user;
    return new SuccessRep(user);
  } else {
    return new ErrorRep("user.pwd.invalid");
  }
};

/**
 * Logout
 * @param session
 */
userService.logout = function(session) {
  session.destroy();
  return new SuccessRep();
}

/**
 * CheckLogin
 * @param session
 */
userService.checkLogin = function(session) {
  if (session.user) {
    return new SuccessRep();
  } else {
    return new ErrorRep("user.not.logged.in");
  }
}

/**
 * Change current user's password
 * @param username
 * @param oldPwd
 * @param newPwd
 */
userService.changePassword = function(username, oldPwd, newPwd) {
  let result = checkUser(username, oldPwd);
  let user = result.getResult();
  if (result.isFailed()) {
    return result;
  }

  if (!newPwd) {
    return new ErrorRep("user.change.pwd.newInvalid");
  }

  let oldPwdEnc = encrypt(oldPwd);
  if (oldPwdEnc !== user.password) {
    return new ErrorRep("user.change.pwd.oldInvalid");
  }

  let newPwdEnc = encrypt(newPwd);
  user.password = newPwdEnc;
  $fs.writeFileSync(`${__home}/config.json`, JSON.stringify($config, null, 2));
  return new SuccessRep();
}

/**
 * Check whether user is administrator
 * @param user
 */
userService.checkPermission = function(user) {
  if (user && user.role === 'administrator') {
    return new SuccessRep();
  } else {
    return new ErrorRep("user.permission.deny");
  }
}

/**
 * Check username and password not null, and check user exists
 * @param username
 * @param password
 */
function checkUser(username, password) {
  //check username and password valid.
  if (!username ) {
    return new ErrorRep("user.name.invalid");
  } else if (!password ) {
    return new ErrorRep("user.pwd.invalid");
  }

  // get user information
  let user = _.find($config.users, u => u.username === username);
  if (!user) {
    return new ErrorRep("user.not.exist", username);
  }

  return new SuccessRep(user);
}



/**
 * Encrypt password
 * @param password
 */
function encrypt(password){
  return crypto.createHmac(SECRET_TYPE, SECRET).update(password).digest('hex');
}


module.exports = userService;