const {instance}=require('../config/razorpay')
const Course=require('../models/Course')
const User=require('../models/User')
const mailSender=require('../utlis/mailSender')
const {courseEnrollmentEmail}=require('../mail/templates/courseEnrollmentEmail')
const { default: mongoose } = require('mongoose')
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail')
const crypto = require('crypto');
require('dotenv').config();
exports.capturePayment=async(req,res)=>{
      const {courses}=req.body
    
      
      const userId=req.user.id;

      if(courses.length === 0){
          return res.json({
            success:false,
             message:"Course Id not Found"
          })
      }

      let totalAmount=0;
      for(const course_id of courses){
         let course;
         try{
               course=await Course.findById(course_id);
               if(!course){
                 return res.status(200).json({
                    suceess:false,
                    message:"Could not find the course"
                 })
               }

               const uid=new mongoose.Types.ObjectId(userId);
               if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    suceess:false,
                    message:"Student is Already Enrolled"
                 })
               }
               totalAmount+=course.price
         }catch(error){
             console.log(error);
             return res.status(500).json({
                suceess:false,
                message:error.message
             })
             
         }
      }

      const options={
        amount:totalAmount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString(),
      }
      try{
          const paymentResponse=await instance.orders.create(options);
          res.json({
            success:true,
            message:paymentResponse,
          })
      }catch(error){
           console.log(error);
           return res.status(500).json({
            success:false,
            message:"Could not Initiate Order"
           })
           
      }
}


exports.verifyPayment = async (req, res) => {
    console.log("request in verifyPayment is", req.body);
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;
  
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
      return res.status(200).json({ success: false, message: "Payment Failed" });
    }
  
    let body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");
  
    if (expectedSignature === razorpay_signature) {
      await enrollStudents(courses, userId, res);
      return res.status(200).json({ success: true, message: "Payment Verified" });
    }
    
    return res.status(200).json({ success: false, message: "Payment Failed" });
  }


const enrollStudents=async(courses,userId,res)=>{
     try{
        if(!courses || !userId){
            return res.status(400).json({
                success:false,
                message:"Please Provide data for course or UserId"
            })
         }
    
         for(const courseId of courses){
            const enrolledCourse=await Course.findOneAndUpdate({
                _id:courseId
            },{$push:{studentsEnrolled:userId}},{new:true})
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not Found"
                })
            }
    
            const enrolledStudent=await User.findByIdAndUpdate(userId,{
                $push:{courses:courseId}
            },{new:true})
             
            const emailResponse=await mailSender(enrolledStudent.email,`Successfully Enrolled into ${enrolledCourse.courseName}`)
             console.log("Email Sent Successfully ",emailResponse);
             
         }

     }catch(error){
          console.log(error);
          return res.status(500).json({
            success:false,
            message:error.message
          })
          
     }
}



exports.sendPaymentSuccessEmail=async(req,res)=>{
      try{
        const {orderId,paymentId,amount}=req.body;

        const userId=req.user.id;

        if(!orderId || !paymentId || !amount || !userId)
            {
             return res.status(400).json({
                      success:false,
                      message:"Please provide all the fields"
             })    
            }
        const  enrolledStudent=await User.findById(userId);
        await mailSender(enrolledStudent.email,`Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstname} ${enrolledStudent.lastname}`,amount/100,orderId,paymentId)
        )

      }catch(error){
              console.log("error in sending email",error); 
              return res.status(500).json({
                success:false,
                message:"Could not send email"
       })             
      }
}


exports.razorpay_key=async (req,res)=>{ 
        try {
          return res.status(200).json({
            success: true,
            key: process.env.RAZORPAY_KEY, // Note: NOT Key Secret
          });
        } catch (error) {
          return res.status(500).json({ success: false, message: "Unable to fetch Razorpay Key" });
        }
    
}