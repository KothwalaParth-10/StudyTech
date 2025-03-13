const { default: mongoose } = require('mongoose')
const moongoose=require('mongoose')

const courseSchema=new moongoose.Schema({
     courseName:{
            type:String
     },
     courseDescription:{
           type:String
     },
     instructor:{
        type:moongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
     },
     whatYouWillLearn:{
        type:String,
     },
     courseContent:[{
        type:moongoose.Schema.Types.ObjectId,
        ref:"Section",
     }],
     ratingAndReviews:[{
        type:moongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview",
     }],
     price:{
        type:Number
     },
     thumbnail:{
        type:String
     },
     category:{
        type:moongoose.Schema.Types.ObjectId,
        ref:"Category",
     },
     studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
     }],
     tag:{
      type:[String],
      required:true
     },
     instructions:{
      type:[String],
     },
     status:{
      type:String,
      enum:["Draft","Published"]
     },
     createdAt:{
      type:Date,
      default:Date.now(),
 }

})

module.exports=moongoose.model("Course",courseSchema)