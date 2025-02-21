//resetPasswordToken --> for seding mail for restpassword
//restpassord --> db update function

const User = require('../models/User')
const mailSender = require('../utlis/mailSender')
const bcrypt=require('bcrypt')

exports.resetPasswordToken= async (req, res) => {
    //get email from req body 
    //check user for this email, email validation 
    //generate token
    //update user by adding token and  expiration time
    //create url
    //send mail containing the url
    //return response
    try {
        const email = req.body.email;

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.json({
                success: false,
                message: "your Email is not registered with us"
            })
        }

        const token = crypto.randomUUID();

        const updatedDetails = await User.findOneAndUpdate({ email: email }
            , {
                token: token,
                resetPasswordExpirse: Date.now() + 5 * 60 * 1000
            },
            { new: true })
        console.log(updatedDetails);

        const url = `http://localhost:3000/update-password/${token}`

        await mailSender(email, "Reset Password",
            `<h1>Reset Password Link</h1>
            <p>url: ${url}</p>`
        )

        return res.json({
            success: true,
            message: 'Email sent successfully ,please check email and change password '
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: 'something went wrong while sending rest password mail'
        })
    }
}

exports.resetPassword=async (req,res)=>{
    //datafetch
    //validation
    //get details from db using token
    //if no entry invalid
    //token time check
    //hash password
    //pasword update
    //return response
    try{

        const {password,confirmPassword,token}=req.body

        if(password !== confirmPassword)
        {
            return res.json({
                success:false,
                message:'Password does not match'
            })
        }

        const userDetails =await User.findOne({token:token})

        if(!userDetails)
        {
            return res.json({
                success:false,
                message:'Token is invalid'
            })
        }

        if(userDetails.resetPasswordExpirse < Date.now())
        {
            return res.json({
                success:false,
                message:'Time Expired ,please try again'
            })
        }

        const hashedpassword=await bcrypt.hash(password,10)

        await User.findOneAndUpdate({token:token},{
            password:hashedpassword
        },{new:true})

        return res.status(200).json({
            success:true,
            message:'Password reset successfully'
        })

    }catch(error)
    {  
        console.log(error);
        
        return res.status(500).json({
            success:false,
            message:'Error while Updating password,please try again'
        })
    }
}