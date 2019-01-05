const db = require("../../db");
const verifyEntry = require("../utils");

function getAll(postId) {
  return db("ratings")
    .where({ post_id: postId })
}

function create(entry) {

  // The verifyEntry invocation has been moved to controllers
  // and the throw error has been moved into verifyEntry itself

  // const errors = utils.verifyEntry(entry, "ratings")
  // if (errors.length > 0 ) {
  //   throw { status: 400, message: "Missing " + errors.join(", ") };
  // }
  return db("ratings")
    .insert(entry)
    .returning("*")
}

function update(voteData) {
  // const errors = verifyEntry("ratings")

  // if (errors && errors.length > 0) {
  //   console.log("you haven't fulfilled the parametes for some reason")
  //   throw { status: 400, message: "Missing " + errors.join(", ") }
  // }
  return db("ratings").insert({
    rating: voteData[0],
    user_id: voteData[1],
    post_id: voteData[2]
  })
}

function remove(id) {
  return db("ratings")
    .del()
    .where({ id })
    .returning("*")
}

module.exports = { getAll, create, update, remove }
