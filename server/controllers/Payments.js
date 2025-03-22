const {instance}=require('../config/razorpay')
const Course=require('../models/Course')
const User=require('../models/User')
const mailSender=require('../utlis/mailSender')
const {courseEnrollmentEmail}=require('../mail/templates/courseEnrollmentEmail')
const { default: mongoose } = require('mongoose')
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail')
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
exports.verifySignature=async(req,res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(200).json({
            success:false,
            message:"Payment Failed"
        })
    }
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

    if(expectedSignature === razorpay_signature){

        await enrollStudents(courses,userId,res);

        return res.status(200).json({
            success:true,
            message:"Payment Verified"
        })
    }
    return res.status(200).json({
        success:false,
        message:"Payment Failed"
    })

      
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
// exports.capturePayment= async (req,res)=>{
//     /*get course id and User id
//      validation
//      valid courseId 
//      valid courseDetail
//       user already pay for the same course
//       order create 
//       return response
//     */

//     const {course_id}=req.body;
//     const userid=req.user.id;

//     if(!course_id){
//          return res.status(404).json({
//             success:false,
//             message:'Please provide valid course ID'
//          })
//     } 
//     let course;
//     try{
//             course=await Course.findById(course_id);
//             if(!course)
//             {
//                 return res.status(404).json({
//                     success:false,
//                     message:'could not find thee course'
//                  })
//             }

//             const uid=mongoose.Types.ObjectId(userid);
//             if(course.studentsEnrolled.includes(uid))
//             {
//                 return res.status(400).json({
//                     success:false,
//                     message:'student is already enrolled'
//                  })
//             }
           
//     }catch(error)
//     {
//         return res.status(500).json({
//             success:false,
//             message:'Error while capturing the payment',
//             error:error.message
//          })
//     }
//     const amount=course.price;
//     const currency="INR";

//     const options={
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId:course_id,
//             userid
//         }
//     }

//     try{
//          const paymentResponse=await instance.orders.create(options)
//          console.log(paymentResponse);

//          return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             ordderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount
//          })


//     }catch(error){
//         return res.status(500).json({
//             success:false,
//             message:'Error while initiate the order',
//             error:error.message
//          })
//     }
// }
//SHA- SHA is a Hashing Algorithm to convert data into secure format..
//HMAC- SHA jevu j chee but aema secret pan vapray..   
// exports.verifySignature=async (req,res)=>{
//     const webhookSecret='12345678'

//     const signature=req.headers["x-razorpay-signature"];

//     const shasum=crypto.createHmac("sha256",webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest=shasum.digest("hex");

//     if(signature === digest)
//     {
//         console.log("Payment is Authorised");

//         const {courseId,userId}=req.body.payload.payment.entity.notes;

//         try{
//              const enrolledCourse=await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true});
             
//              if(!enrolledCourse)
//              {
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course not Found"
//                 })
//              }
//             console.log(enrolledCourse);
            
//              const user=await User.findOneAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true});

//              if(!user)
//                 {
//                    return res.status(500).json({
//                        success:false,
//                        message:"user not Found"
//                    })
//                 }
//             console.log(user);
//             const emailResponse=await mailSender(user.email,
//                 "Congratulations from ParthStudyTech",
//                 `Congratulations, you are onboareded into new ${enrolledCourse.courseName} Course`
//             );

//             console.log(emailResponse);


//               return res.status(200).json({
//                 success:true,
//                 message:"Signature Verified and Course Added"
//             })
            

//         }catch(error)
//         { 
//             console.log(error);
            
//             return res.status(500).json({
//                 success:false,
//                 message:error.message
//             })
//         }
        
//     }else{
//         return res.status(400).json({
//             success:false,
//             message:"Invalid request"
//         })
//     }
// }