const models = require("../models/auth");
const jwt = require("jsonwebtoken");

function login(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    next({ status: 400, message: "Bad Request" });
  } else {
    models.login(username, password)
    .then(user => {
      const token = jwt.sign({ sub: { id: user.id } }, process.env.SECRET);

      res.status(200).send({ token });
    })
    .catch(next);
  }
}

module.exports = { login };
