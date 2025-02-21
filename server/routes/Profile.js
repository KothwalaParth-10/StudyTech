const express=require('express');
const router=express.Router();

const {auth}=require("../middleware/auth");

const {updateProfile,
    deleteAccount,
    getAllUserDetails,updateDp,getEnrolledCourses}=require("../controllers/Profile");

    router.delete("/deleteProfile",auth,deleteAccount);
    
    router.put("/updateProfile",auth,updateProfile);

    router.get("/getUserDetails",auth,getAllUserDetails);

    router.post("/updateDisplayPicture",auth,updateDp);
    
    router.get("/getEnrolledCourses", auth, getEnrolledCourses)



module.exports=router