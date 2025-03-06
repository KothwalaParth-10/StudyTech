const Section = require('../models/Section')
const Course = require('../models/Course')
const SubSection = require("../models/SubSection")

exports.createSection = async (req, res) => {
    try {

        const { courseId, sectionName } = req.body;

        if (!courseId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const newSection = await Section.create({ sectionName });

        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            $push: {
                courseContent: newSection._id
            }
        }, { new: true })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            });

        return res.status(200).json({
            success: true,
            message: 'Section created successfully',
            newSection,
            updatedCourse
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create Section',
            error: error.message,
        })
    }
}


exports.updateSection = async (req,res) => {
    try {
        
        const {sectionId, sectionName, courseId} = req.body;

        if (!sectionId || !sectionName) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }

        const updatedSection = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});
        const updatedCourse = await Course.findById(courseId)
          .populate({
              path:"courseContent",
              populate: {
                  path:"subSection"
              }});
        return res.status(200).json({
            success:true,
            message:'Section updated successfully',
            updatedCourse
        })   
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to update Section',
            error: error.message,
        })
    }
}


exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;

        if (!sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'Both sectionId and courseId are required',
            });
        }

        const sectionDetails = await Section.findById(sectionId);
        if (!sectionDetails) {
            return res.status(404).json({
                success: false,
                message: 'Section not found',
            });
        }

        // Deleting subsections using Promise.all to handle async deletion
        if (sectionDetails.subSection && sectionDetails.subSection.length > 0) {
            await Promise.all(sectionDetails.subSection.map(ssid => SubSection.findByIdAndDelete(ssid)));
        }

        // Delete the section itself
        await Section.findByIdAndDelete(sectionId);

        // Update the Course by removing the section reference
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $pull: { courseContent: sectionId } },
            { new: true }
          )
            .populate({
              path: "courseContent",
              populate: {
                path: "subSection", // Assuming `subSection` is a field inside `Section`
              },
            });
         
        return res.status(200).json({
            success: true,
            message: 'Section deleted successfully',
            updatedCourse,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to delete section',
            error: error.message,
        });
    }
};