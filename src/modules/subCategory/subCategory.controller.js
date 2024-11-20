import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
import { SubCategory } from "../../../database/models/subCategory.model.js"
import { Category } from "../../../database/models/category.model.js"
import {  allData, deleteOne, getOne, updateOnee } from "../handlers/refactor.js"






const addSubCategory = catchError(async(req,res,next)=>{
    const category  = await Category.findById(req.body.category)
    if(!category) return next(new AppError("Category not found",404))
    let subCategory = new SubCategory(req.body)
    await subCategory.save()
    res.json({message:'success',subCategory})
})

const allSubCategories = allData(SubCategory,'subCategories')
// catchError(async (req,res,next)=>{
//     let filterObj ={}
//     if(req.params.category) filterObj.category =req.params.category
//     let apiFeatures = new ApiFeatures(SubCategory.find(filterObj),req.query)
//     .pagination().fields().filter().search().sort()

//     let subCategories = await apiFeatures.mongooseQuery
//     res.json({message:'success',page:apiFeatures.pageNumber,subCategories})
// })

const getSubCategory = getOne(SubCategory,'subCategory')
// catchError(async(req,res,next)=>{
//     let subCategory=await SubCategory.findById(req.params.id)
//     subCategory || next(new AppError('subCategory not found',404))
//     !subCategory || res.json({message:'success',subCategory})
// })

const updateSubCategory = catchError(async(req,res,next)=>{
    if(req.body.name)req.body.slug = slugify(req.body.name)
    let subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body , {new:true})
    subCategory || next(new AppError('subCategory not found',404))
    !subCategory || res.json({message:'success',subCategory})
}
)

const deleteSubCategory = deleteOne(SubCategory,'subCategory')
// catchError(async(req,res,next)=>{
//     let subCategory = await SubCategory.findByIdAndDelete(req.params.id)
//     subCategory || next(new AppError('subCategory not found',404))
//     !subCategory || res.json({message:'success',subCategory})
// }
// )


export{
    addSubCategory,
    allSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory

}