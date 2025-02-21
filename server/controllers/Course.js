const Course = require('../models/Course')

const Category = require('../models/category')
const User = require('../models/User')

const { uploaderImageToCloudinary } = require('../utlis/imageUploader')

//createCourse handler function
exports.createCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, price, category } = req.body

        const thumbnail = req.files.thumbnailImage

        if (!courseDescription || !courseName || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        //
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId)
        console.log("Instructor Details: ", instructorDetails);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found",
            })
        }

        const categoryDetails = await Category.findById(category)
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details not found",
            })
        }

        const thumbnailImage = await uploaderImageToCloudinary(thumbnail, process.env.FOLDER_NAME)

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            price,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url
        })

        await User.findByIdAndUpdate({ _id: instructorDetails._id }
            , {
                $push: {
                    courses: newCourse._id
                }
            }
            , { new: true })


        await Category.findByIdAndUpdate({ _id: categoryDetails._id },
            {
                $push: {
                    course: newCourse._id
                }
            },
            { new: true })

        return res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            data: newCourse
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            suceess: false,
            message: 'Failed to create Course',
            error: error.message
        })
    }
}

//getAllCourses handler function

exports.showAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true
        }).populate("instructor").exec()

        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully",
            data: allCourses
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            suceess: false,
            message: 'Cannot Feetch course data',
            error: error.message
        })
    }
}

exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;

        const courseDetails = await Course.find({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            })
            .populate("category")
           // .populate("ratingAndreviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            }).exec()
            console.log(courseDetails);
            
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find the course with ${courseId}`
            })
        }

        return res.status(200).json({
            success: true,
            message: "Course Details fetched successfully",
            data: courseDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}