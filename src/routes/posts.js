const express = require("express");
const router = express.Router();

const postController = require("../controllers/posts");
const authController = require("../controllers/auth");

router.get("/", postController.getAll);
router.get("/:post_id/rating", postController.getRating);
router.post("/", authController.authorize, postController.create);
router.put("/:post_id", authController.authorize, authController.editPost, postController.update);
router.delete("/:post_id", authController.authorize, authController.editPost, postController.remove);

module.exports = router;
