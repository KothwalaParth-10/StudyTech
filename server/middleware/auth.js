//auth --> token validity
//isStudent --> authorization
//isInstrructor --> authorization
//isAdmin --> authorization
const User =require("../models/User")
const jwt = require("jsonwebtoken")
require("dotenv").config()


// const auth = async (req, res, next) => {
//     try {
      
//         const token = req.cookies.token || req.body.token || req.headers.authorization?.split(" ")[1];

//         if(!token)
//         {
//             return res.status(401).json({
//                 success:false,
//                 message:"Token is missing"
//             })
//         }

//         try{
//             const decode=jwt.verify(token,process.env.JWT_SECRET);
//             req.user=decode          

//         }catch(error)
//         {
//             return res.status(401).json({
//                 success:false,
//                 message:"Token is invalid"
//             })
//         }
//         next()
//     } catch (error) {
//            return res.status(401).json({
//             success:false,
//             message:"Something went while validating the token"
//            })
//     }

// }

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token || req.body.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next(); // Proceed to the next middleware
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "Token has expired",
                });
            }
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
};


const isStudent=async (req,res,next)=>{
     try{
          if(req.user.accountType !== "Student")
          {
            return res.status(401).json({
              success:false,
              message:"This is a protected route for Students only"
            })
          }
          next()
     }catch(error)
     {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
           })
     }
}

const isInstructor=async (req,res,next)=>{
    try{
         if(req.user.accountType !== "Instructor")
         {
            return res.status(401).json({
                success:false,
                message:"This is a protected route for instructor only"
              })
         }
         next()
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
           })
    }
}
const isAdmin=async (req,res,next)=>{
    try{  
        
        
         if(req.user.accountType !== "Admin")
         {
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin only"
              })
         }
         next()
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
           })
    }
}
module.exports={isAdmin,isInstructor,isStudent,auth}
