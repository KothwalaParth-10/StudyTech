const mongoose=require("mongoose")

const AboutSchema=new mongoose.Schema({
    countrycode:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
    },
    message:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("About",AboutSchema)