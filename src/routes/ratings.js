const express = require("express");
const router = express.Router({mergeParams: true});

const rateController = require("../controllers/ratings");
const authController = require("../controllers/auth");

router.get("/", rateController.getAll)
// router.post("/", authController.authorize, rateController.create);
router.post("/:rating_id", authController.authorize, rateController.check, rateController.update);
// router.put("/:rating_id", authController.authorize, authController.editRating, rateController.update);
router.delete("/:rating_id", authController.authorize, authController.editRating, rateController.remove);

module.exports = router;
