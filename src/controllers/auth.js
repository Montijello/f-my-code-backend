const models = require("../models/auth");
const jwt = require("jsonwebtoken");
const db = require("../../db");

//  Logs the user in, returns the jwt token.
function login(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) { // Requires a username and password
    return next({ status: 400, message: "Bad Request" });
  } else {
    models.login(username, password)
      .then(user => {

        /////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////    why the substring in the token below?      /////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////////////


        // const token = jwt.sign({ sub: { id: user.id } }, process.env.SECRET);
        const token = jwt.sign({ id: user.id }, process.env.SECRET);

        // return res.status(200).send({ id: user.id, token });
        return res.status(200).send({ token });
      })
      .catch(next);
  }
}

/*
 *  QUALITY OF LIFE FUNCTIONS
 */

function getAuthStatus(req, res, next){
  res.status(200).send({id:req.claim.id})
}

function isAuthenticated(req, res, next){
  if(!req.headers.authorization){
    return next({ status: 401, message: 'Unauthorized' })
  }
  const [scheme, credentials] = req.headers.authorization.split(' ')

  jwt.verify(credentials, process.env.SECRET, (err, payload)=>{
    if(err){
      return next({ status: 401, message: 'Unauthorized' })
    }
    req.claim = payload
    next()
  })
}

/*
 *  END QOL FUNCTIONS
 */

//  Checks the header for a valid jwt token.
function authorize(req, res, next) {
  if (!req.headers.authorization) { // look for the authorization header
    return next({ status: 401, message: "Unauthorized" });
  } else {
    // Pull the token of the authorization heading

    const [scheme, token] = req.headers.authorization.split(" ");

    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (err) {
        return next({ status: 401, message: "Unauthorized" });
      }

      // The payload has been re-encoded from base64 to unicode. Attach it to
      // the req for later use.
      req.claim = payload;
      next()
    })
  }
}


/*
 *  The middleware functions below use a helper function, permit, to return specified data from their 
 *  associated tables, checking the user's token to ensure authorization.
 */

function permit(table, id, claim) {
  return db(table)
    .where({ id: id })
    .then(([data]) => {
      if (!data) {
        throw { status: 400, message: "Bad Request" };
      }
      if (data.user_id !== claim.sub.id) {
        throw { status: 401, message: "Unauthorized" };
      }
      else return
    })
}

function editPost(req, res, next) {
  permit("posts", req.params.post_id, req.claim)
    .then(next)
    .catch(next);
}

function editComment(req, res, next) {
  permit("comments", req.params.comment_id, req.claim)
    .then(next)
    .catch(next);
}

// function editCommentByPost(req, res, next) {
//   permit("posts", req.params.post_id, req.claim)
//     .then(next)
//     .catch(next);
// }

function editRating(req, res, next) {
  permit("ratings", req.params.rating_id, req.claim)
    .then(next)
    .catch(next);
}

function postDeletePermit(postId, claim) {
  return db("posts")
    .where({ id: postId, user_id: claim.sub.id });
}

function deleteComment(req, res, next) {
  postDeletePermit(req.params.post_id, req.claim)
    .then(([data]) => {
      if (!data) {
        permit("comments", req.params.comment_id, req.claim)
          .then(next)
          .catch(next);
      } else {
        next();
      }
    });
}

function test(req, res, next) {
  res.status(200).send("Yay!");
}

module.exports = {
  login,
  authorize,
  test,
  editPost,
  editRating,
  editComment,
  deleteComment, 
  getAuthStatus,
  isAuthenticated
};
