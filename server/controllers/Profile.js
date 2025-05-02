const Profile = require('../models/Profile')
const User = require('../models/User')
const Course = require('../models/Course')
const { uploaderImageToCloudinary } = require("../utlis/imageUploader")
const { convertSecondsToDuration}=require("../utlis/secToDuration")
const CourseProgress=require("../models/CourseProgress")

exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body
    const id = req.user.id;
    console.log(dateOfBirth);
    
    if (!id || !contactNumber || !gender) {
      console.log(gender);
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }

    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    profileDetails.gender = gender;

    (await profileDetails.save());
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profileDetails
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update Profile, please try again",
      error: error.message
    })
  }
}
//Explore --> how can we schedule a deletion operation //cron job
exports.deleteAccount = async (req, res) => {
  try {

    const id = req.user.id;

    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    //HW unenroll user from all enrolled courses
    userDetails.courses.forEach(async (course) => {
      await Course.findByIdAndUpdate(course, {
        $pull: { studentsEnrolled: userDetails._id }
      }, { new: true })
    })

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete Account, please try again",
      error: error.message
    })
  }
}

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id).populate("additionalDetails").exec();

    return res.status(200).json({
      success: true,
      message: "User Data Fetched Successfully",
      userDetails
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch User Details, please try again",
      error: error.message
    })
  }
}
exports.updateDp = async (req, res) => {
  try {
    const id = req.user.id;
    const file = req.files.imagefile;

    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
    
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found"
      })
    }
    const imageDetails = await uploaderImageToCloudinary(file, "studyTechParth");

    const updated_user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { image: imageDetails.secure_url } },
      { new: true }
    );

   
    if (!updated_user) {
      return res.status(404).json({
        success: false,
        message: "Failed to update"
      })
    }
    return res.status(200).json({
      success: true,
      message: "Profile Picture Updated Successfully",
      updated_user
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to Upload Picture, please try again",
      error: error.message
    })
  }
}

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({ _id: userId })
    .populate({
      path: "courses",
      populate: {
        path: "courseContent",
        model: "Section",
        populate: {
          path: "subSection",
          model: "SubSection"
        }
      }
    })
    .exec();
 // console.log(userDetails);
    
   userDetails = userDetails.toObject()
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
    //  console.log(userDetails.courses[i].courseContent[j]);
      
		  totalDurationInSeconds += userDetails.courses[i].courseContent[
			j
		  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].subSection.length
		}
		let courseProgressCount = await CourseProgress.findOne({
		  courseID: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }
    // console.log(userDetails.courses);
     
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};