
let userService = {};


/**
 * Login
 * @param req
 * @param res
 */
userService.login = function (req, res) {
  let username = _.trim(req.query.username || req.body.username || '');
  let password = req.body.password;
  console.log(`body: ${req.body}`);
  console.log(`username=${username},  password=${password}`);
  if (!username || !password) {
    return res.json({"errcode": 40002, "errmsg": "Invalid username or password"});
  }

  // get user information
  let user = _.find($config.users, u => u.username === username);
  console.log('---_Users----');
  console.log(user);
  if (!user) {
    return res.json({"errcode": 40003, "errmsg": "User not exists"});
  }

  //check password
  if (user.password === password) {
    //set user to session
    req.session.username = user.username;

    return res.json({
      username: user.username
    });
  } else {
    return res.json({"errcode": 40004, "errmsg": "Invalid password"});
  }
};


module.exports = userService;