const Review = require("../models/Review");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");

var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

function ReviewData(data) {
    this.name = data.name;
    this.comments = data.comments;
}

exports.reviews = [
  (req, res) => {
    try {
        Review.find({}).then((review) => {
        return apiResponse.successResponseWithData(
          res,
          "Operation successed",
          review
        );
      });
    } catch (err) {
        //throw error in json response with status 500. 
		return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.review = [
    body("name", "Name must not be empty.").isLength({ min: 1 }).trim(),
    body("comments", "Comments must not be empty.").isLength({ min: 10 }).trim(),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            console.log(req);
            const errors = validationResult(req);
            var review = new Review({name: req.body.name, comments: req.body.comments});
            if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				review.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let reviewData = new ReviewData(review);
					return apiResponse.successResponseWithData(res,"Review added Successfully.", reviewData);
				});
			}
        } catch(err) {
                //throw error in json response with status 500. 
                return apiResponse.ErrorResponse(res, err);
        }
    }
];