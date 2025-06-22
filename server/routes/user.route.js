const {handleLogin,handleSignUp}= require("../controllers/user.controller.js")
const {auth}= require("../middlewares/auth.middleware.js")
const {getUserInfo}= require("../controllers/getUserInfo.js")
const express= require("express")
const router= express.Router();

router
.route("/signup")
.post(handleSignUp)

router
.route("/login")
.post(handleLogin)

router
.route("/home")
.get(auth,getUserInfo)

module.exports= router;
