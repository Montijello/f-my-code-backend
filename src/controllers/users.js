const verifyEntry = require("../utils")
const models = require("../models/users")

function getOneById(req, res, next) {
  return models.getOneById(req.params.user_id)
    .then(user => {
      res.status(200).send(user);
    })
    .catch(next);
}

function create(req, res, next) {
  // verifyEntry won't return if the req.body doesn't have all required fields, it will throw an error
  try{
    verifyEntry(req.body, 'users')
  }
  catch(exception){
    return next({ status: 400, message: exception })
  }

  return models.createUser(req.body.username, req.body.password)
    .then(user => {
      res.status(201).send(user);
    })
    .catch(next);
}

// userModel.create(req.body.username, req.body.password)
// .then(function(data){
//   return res.status(201).send({ data })
// })
// .catch(next)
// }

module.exports = { create, getOneById };
