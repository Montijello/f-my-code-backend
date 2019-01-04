const models = require("../models/posts");

function getAll(req, res, next) {
  models.getAll()
    .then((data) => {
      res.status(200).send(data)
    })
    .catch(next)
}

function create(req, res, next) {
  const entry = req.body;
  entry.user_id = req.claim.sub.id;

  models.create(entry)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(next);
}

function update(req, res, next) {
  const entry = req.body;
  const id = req.params.post_id;

  models.update(entry, id)
    .then(response => {
      res.status(201).send(response)
    })
    .catch(next)
}

function remove(req, res, next) {
  const id = req.params.post_id;
  models.remove(id)
    .then(data => {
      if (data.length < 1) {
        throw {
          status: 404,
          message: "No Post Associated With The Given ID"
        }
      }
      res.status(200).send(data)
    })
    .catch(next)
}

function getRating(req, res, next) {
  models.getRating(req.params.post_id)
    .then(([ data ]) => {
      if (data.rating === null) {
        data.rating = "0";
      }
      res.status(200).send(data);
    })
    .catch(next);
}

module.exports = { getAll, create, update, remove, getRating }
