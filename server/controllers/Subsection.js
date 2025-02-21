const SubSection = require('../models/SubSection')
const Section = require('../models/Section')
const { uploaderImageToCloudinary } = require('../utlis/imageUploader')
require('dotenv').config();




exports.createSubSection = async (req, res) => {
    try {
        //fetch data from Req body
        //extract file/video
        //validation
        //upload video to cloudinary
        //create a subsection
        //update section with this subsection ObjectId  
        //return response

        const { sectionId, title, timeDuration, description } = req.body;

        const video = req.files.videoFile;

        if (!sectionId || !timeDuration || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const uploadDetails = await uploaderImageToCloudinary(video, process.env.FOLDER_NAME)

        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url
        })

        const updatedSetion = await Section.findByIdAndUpdate({ _id: sectionId },
            {
                $push: { subSection: SubSectionDetails._id }
            },
            { new: true }).populate().exec()
        console.log(updatedSetion);

        return res.status(200).json({
            success: true,
            message: "Sub Section Created Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while creating Sub Section,please try again",
            error:error.message
        })
    }
}


exports.updateSubSection = async (req, res) => {
    try {
        //data input
        //data validation
        //update data
        //return res

        const {title, timeDuration, description, SubsectionId } = req.body

        if (!title|| !timeDuration || !description|| !SubsectionId) {
            return res.status(400).json({
                success: false,
                message: "missing Properties"
            })
        }

        const subsection = await SubSection.findByIdAndUpdate(SubsectionId, { title,timeDuration,description}, { new: true })


        return res.status(200).json({
            success: true,
            message: "SubSection updated Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update SubSection, please try again",
            error: error.message
        })
    }
}

exports.deleteSubsection=async(req,res)=>{
    try{
        const {SubsectionId}=req.params;
        await SubSection.findByIdAndDelete(SubsectionId)
        return res.status(200).json({
            success: true,
            message: "SubSection deleted Successfully",
        })
    }catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Unable to delete SubSection, please try again",
            error: error.message
        })
    }
}