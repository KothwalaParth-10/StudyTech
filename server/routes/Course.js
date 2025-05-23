const express=require('express');
const router=express.Router();

const {createCourse,showAllCourses,getCourseDetails,getInstructorCourses, deleteCourse,getFullCourseDetails,editCourse}=require("../controllers/Course");

const {createCategory,showallCategory,categoryPageDetails}=require("../controllers/Category");

const {createSection,updateSection,deleteSection}=require("../controllers/Section");

const {deleteSubsection,updateSubSection,createSubSection}=require("../controllers/Subsection")

const {createRating,getAverageRating,getAllRating,}=require("../controllers/RatingAndReview");

const {isAdmin,isInstructor,isStudent,auth}=require("../middleware/auth")

router.post("/getCourseDetails",getCourseDetails)
                                
router.post("/createCourse",auth,isInstructor,createCourse);

router.post("/addSection",auth,isInstructor,createSection)

router.post("/updateSection",auth,isInstructor,updateSection);

router.post("/deleteSection",auth,isInstructor,deleteSection)


router.post("/addSubSection",auth,isInstructor,createSubSection)

router.post("/updateSubSection",auth,isInstructor,updateSubSection);

router.post("/deleteSubSection",auth,isInstructor,deleteSubsection)

router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)

router.post("/getFullCourseDetails", auth, getFullCourseDetails)

router.post("/createCategory",auth,isAdmin,createCategory)


router.get("/showallCategories",showallCategory);

router.post("/getCategoryPageDetails",categoryPageDetails)


router.post("/createRating",auth,isStudent,createRating)

router.get("/getAverageRating",getAverageRating);

router.get("/getReviews",getAllRating)

router.delete("/deleteCourse", deleteCourse)

router.post("/editCourse", auth, isInstructor, editCourse)

router.post("/getCategoryPageDetails", categoryPageDetails)

module.exports=router