const express=require('express');
const router=express.Router();

const {login,signUp,sendOTP,changepassword}=require("../controllers/Auth")
const {resetPasswordToken,resetPassword}=require("../controllers/RestPassword")

const {auth}=require("../middleware/auth");

router.post("/login",login);

router.post("/signup",signUp);

router.post("/sendotp",sendOTP);

router.post("/changepassword",auth,changepassword);

router.post("/reset-password-token",resetPasswordToken);

router.post("/reset-password",resetPassword);




module.exports=router