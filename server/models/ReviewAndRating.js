const { default: mongoose } = require("mongoose")
const moongoose=require("mongoose")

const ratingAndReviewSchema= new moongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course",
        index:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true,
    }

});

module.exports=mongoose.model("RatingAndReview",ratingAndReviewSchema)