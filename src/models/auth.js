const bcrypt = require("bcrypt");

const db = require("../../db");
const userModel = require("./users");

function login(username, password) {
  let user;

  return userModel.getOneByUsername(username)
    .then(data => {
      if (!data) {
        throw { status: 400, message: "User not real" };
      }
      user = data;

      return bcrypt.compare(password, data.password);
    })
    .then(status => {
      if (!status) throw { status: 401, message: "Unauthorized" };

      delete user.password;

      return user;
    })
}

module.exports = {login}
