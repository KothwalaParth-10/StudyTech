const express=require('express');
const router=express.Router();

 const {capturePayment,verifyPayment,sendPaymentSuccessEmail,razorpay_key}=require("../controllers/Payments");

 const {auth,isInstructor,isStudent,isAdmin}=require("../middleware/auth");

 router.post("/capturePayment",auth,isStudent,capturePayment);

 router.post("/verifyPayment",auth, isStudent, verifyPayment)

 router.post("/sendPaymentSuccessEmail", auth, isStudent,sendPaymentSuccessEmail);

 router.get('/get-razorpay-key',razorpay_key);

module.exports=router