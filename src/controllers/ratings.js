const models = require("../models/ratings");

function getAll(req, res, next) {
  const postId = req.params.post_id;

  models.getAll(postId)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(next);
}

function create(req, res, next) {
  const entry = req.body;
  entry.user_id = req.claim.sub.id
  entry.post_id = req.params.post_id

  models.create(entry)
    .then(response => {
      res.status(201).send(response)
    })
    .catch(next)
}

function check(req, res, next) {
  const postId = req.params.rating_id
  const userId = req.claim.id
  const rating = req.body[1]

  const voteData = [rating, userId, postId]

  models.check(voteData).then(response => {
    if (response[0] === undefined) next()
    else if (response[0].rating + voteData[0] === 0) {
      models.remove(userId, postId)
        .then(response => { res.status(201).send(response) })
    }
    else {
      res.status(500).send(response)
    }
  })
    .catch((err) => console.log(err));
}

// The following info will land in the db
// id: whatever....
// rating: req.body[1]
// user_id: req.claim.id
// post_id: req.body[0]

function update(req, res, next) {
  const postId = req.params.rating_id
  const userId = req.claim.id
  const rating = req.body[1]

  const voteData = [rating, userId, postId]


  models.update(voteData)
    .then(response => {
      res.status(201).send(response)
    })
    .catch(next)
}

function remove(req, res, next) {
  const id = req.params.rating_id

  models.remove(id)
    .then(response => {
      res.status(200).send(response)
    })
    .catch(next)
}

module.exports = { getAll, create, update, remove, check }
