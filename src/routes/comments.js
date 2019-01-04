const express = require("express");
const router = express.Router({ mergeParams: true });

const commController = require("../controllers/comments");
const authController = require("../controllers/auth");

router.get("/", commController.getAll);
router.post("/", authController.authorize, commController.create);
router.put("/:comment_id", authController.authorize, authController.editComment, commController.update);
router.delete("/:comment_id", authController.authorize, authController.deleteComment, commController.remove);

module.exports = router;
