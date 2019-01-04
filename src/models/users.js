const bcrypt = require("bcrypt");
const db = require("../../db");

function getOneById(user_id) {
  return db("users")
    .where({ id: user_id })
    .first();
}

function getOneByUsername(username) {
  return db("users")
    .where({ username: username })
    .first()
}

function createUser(username, password) {

  // The verifyEntry invocation has been moved to controllers
  // and the throw error has been moved into verifyEntry itself

  // const errors = utils.verifyEntry( entry, "users" );
  // if (errors.length > 0) {
  //   throw { status: 400, message: "Missing: " + errors.join(", ") };
  // }

  return getOneByUsername(username)
    .then(data => {
      if (data) {
        throw { status: 400, message: "Username already exists" };
      }
      return bcrypt.hash(password, 10)
    })
    .then(hashedPassword => {

      return db("users")
        .insert({ username, password: hashedPassword })
        .returning("*");
    })
    .then(([user]) => {
      delete user.password;

      return user;
    })
}

module.exports = { getOneByUsername, createUser, getOneById };
