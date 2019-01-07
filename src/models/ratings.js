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

function check(voteData) {
  // the following returns an array with all of the ratings that match
  // even if there is only one rating in the array
  // each rating is returned as an object 
  // like so [ { id: 4, rating: 1, user_id: 4, post_id: 1 }, ...]

  let user_id = Number(voteData[1])
  let post_id = Number(voteData[2])


  return db('ratings').where({
    user_id: user_id,
    post_id: post_id
  })
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

function remove(user_id, post_id) {
  return db("ratings")
    .del()
    .where({ 
      user_id: user_id, 
      post_id: post_id
    })
    .returning("*")
}

module.exports = { getAll, create, update, remove, check }
