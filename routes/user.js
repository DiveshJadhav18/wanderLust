const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { savedRedirectUrl } = require('../middleware.js');

const userControllers = require('../contollers/users.js');

router.route("/signup")
.get(userControllers.renderSignupForm)
.post(wrapAsync(userControllers.signup));

router.route("/login")
.get(userControllers.renderLogin)
.post(savedRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userControllers.login);


router.get("/logout",userControllers.logout);

module.exports = router;