const Category = require('../models/category')

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        const Categoryexist = await Category.findOne({ name: name })

        if (Categoryexist) {
            return res.status(400).json({
                success: false,
                message: 'Category already exist'
            })
        }
        const CategoryDetails = await Category.create({ name, description })
        console.log(CategoryDetails);

        return res.status(200).json({
            success: true,
            message: 'Category Created Successfully'
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.showallCategory= async (req, res) => {
    try {  
        const allCategory=await Category.find({},{name:true,description:true})
        return res.status(200).json({
            success: true,
            message: 'All Category returned Successfully',
            allCategory
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//categoryPageDetails
exports.categoryPageDetails= async (req,res)=>{
    try{
              /*
              get categroy id
              get courses for specified categooryId
              validation
              get courses diffrent  categories
              get top selling courses
              return response
              */
             const {categoryId}=req.body;

             const selectedCategory=await Category.findById(categoryId).populate("courses").exec()


             if(!selectedCategory){
                return res.status(404).json({
                    success:false,
                    message:"Data Not Found"
                });
            }

            const diffrentCategories=await Category.find({
                _id:{$ne:categoryId}
            }).populate("courses").exec()
            
            //h.w top selling courses

            return res.status(200).json({
                success:true,
                data:{
                    selectedCategory,
                    diffrentCategories
                }
            })

    }catch(error){
        console.log(error);        
        return res.status(500).json({
            success:false,
            message:"Data Not Found"
        });
    }
}
