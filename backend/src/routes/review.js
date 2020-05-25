var express = require("express");
const ReviewController = require("../controllers/ReviewController");

var router = express.Router();

router.get("/", ReviewController.reviews);
router.post("/", ReviewController.review);
 
module.exports = router;