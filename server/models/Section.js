const moongoose=require('mongoose')

const SectionSchema=new moongoose.Schema({
      sectionName:{
        type:String,
      },
      subSection:[{
        type:moongoose.Schema.Types.ObjectId,
        ref:"SubSection",
        required:true
      }]
})

module.exports=moongoose.model("Section",SectionSchema)