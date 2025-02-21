const moongoose=require('mongoose')

const profileSchema=new moongoose.Schema({
      
    gender:{
        type:String,
    },
    dateOfBirth:{
        type:String,
    },
    about:{
        type:String,
        trim:true
    },
    contactNumber:{
        type:Number,
        trim:true
    }

})

module.exports=moongoose.model("Profile",profileSchema)