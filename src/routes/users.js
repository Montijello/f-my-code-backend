const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.get("/:user_id", userController.getOneById);
router.post("/", userController.create);

module.exports = router;