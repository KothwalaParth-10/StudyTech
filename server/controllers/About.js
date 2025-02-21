const About=require("../models/About")

const PostAboutinfo= async (req,res) =>{
    try{
        const {countrycode,email,firstname,lastname,message,phoneNo}=req.body;

        if(!countrycode || !email || !firstname || !message || !phoneNo){
            return res.status(404).json({
                success:false,
                message:"Please enter all data"
            })
        }
        const data=await About.create({
            countrycode,
            email,
            firstname,
            lastname,
            message,
            phoneNo
        });
        
        console.log(data);
    
        return res.status(200).json({
            success:true,
            message:"Information Submited Successfully"
        })
    }catch(error){
        console.log(error);
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error
        })       
    }      
}
module.exports={PostAboutinfo}