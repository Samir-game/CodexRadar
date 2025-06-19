const {handleLogin,handleSignUp}= require("../controllers/user.controller.js")

const express= require("express")
const router= express.Router();

router
.route("/signup")
.post(handleSignUp)
router
.route("/login")
.post(handleLogin)

module.exports= router;