const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync.js');
const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressError = require('../utils/ExpressError.js');

const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../contollers/reviews.js");

//Reviews POST Route
router.post("/",isLoggedIn ,validateReview, wrapAsync(reviewController.createReview));

//delete Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview))


module.exports = router;