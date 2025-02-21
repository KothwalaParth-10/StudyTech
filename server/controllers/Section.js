const Section = require('../models/Section')
const Course = require('../models/Course')

exports.createSection = async (req, res) => {
    try {
        //data fetch
        //data validation
        //create section
        //update course with section ObjectID
        //return response

        const { sectionName, courseId } = req.body

        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "missing Properties"
            })
        }

        const newSection = await Section.create({ sectionName })

        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push: { courseContent: newSection._id }
            }
            , { new: true })

        /*HW populate karvanu chhe course jethi section subsection badhu dekhay*/

        return res.status(200).json({
            success: true,
            message: "Section created Successfully",
            updatedCourseDetails
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create Section, please try again",
            error: error.message
        })
    }

}

exports.updateSection = async (req, res) => {
    try {
        //data input
        //data validation
        //update data
        //return res

        const { sectionName, sectionId } = req.body

        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "missing Properties"
            })
        }

        const section = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true })


        return res.status(200).json({
            success: true,
            message: "Section updated Successfully",
            section:section
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update Section, please try again",
            error: error.message
        })
    }
}


exports.deleteSection = async (req, res) => {
    try {
        const { sectionId ,courseId} = req.body;
        await Section.findByIdAndDelete(sectionId)
      const upcourese =await Course.findByIdAndUpdate(courseId,{
            $pull:{courseContent:sectionId}
        },{new:true})
        console.log(upcourese);
        
        return res.status(200).json({
            success: true,
            message: "Section deleted Successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete Section, please try again",
            error: error.message
        })
    }
}