if (process.env.NODE_ENV != 'prodution') {  // to stop our credentials to be share while hosting
    require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listing.js');
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../contollers/listings.js");
const multer = require('multer');

const {storage} = require("../cloudConflict.js");

const upload = multer({storage});

router.route("/",)
.get(wrapAsync(listingController.index))  
.post(isLoggedIn,upload.single('listing[image]') ,wrapAsync(listingController.createListing));

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id",)
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,wrapAsync(listingController.destroyListing));

//index Route
router.get("/",wrapAsync(listingController.index));

//Show Route
// router.get("/:id",wrapAsync(listingController.showListing));

//Create Route
// router.post("/",isLoggedIn,validateListing, wrapAsync(listingController.createListing));

//Edit Route
router.get("/:id/edit",isLoggedIn,wrapAsync(listingController.renderEditForm));


//Update Route
// router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(listingController.updateListing));

//Delete Route
// router.delete("/:id",isLoggedIn,wrapAsync(listingController.destroyListing));

module.exports = router;