import slugify from "slugify"
import { Category } from "../../../database/models/category.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
import fs from 'fs'
import { ApiFeatures } from "../../utils/apiFeatures.js"
import { addOne, allData, deleteOne, getOne , updateOnee} from "../handlers/refactor.js"




const addCategory = addOne(Category,'category')


const allCategories = allData(Category,'categories')
// catchError(async (req,res,next)=>{

//     let apiFeatures =new ApiFeatures(Category.find(),req.query)
//     .pagination().fields().filter().sort().search()
//     console.log(req.query)
//     let categories = await apiFeatures.mongooseQuery
//     console.log(req.query)
//     res.json({message:'success',page:apiFeatures.pageNumber,categories})
// })

const getCategory = getOne(Category,'category')
// catchError(async(req,res,next)=>{
//     let category=await Category.findById(req.params.id)
//     category || next(new AppError('category not found',404))
//     !category || res.json({message:'success',category})
// })


const updateCategory = catchError(async(req,res,next)=>{
    let category = await Category.findById(req.params.id)
    if(!category) return next(new AppError('category not found',404))
    if(req.body.name) req.body.slug = slugify(req.body.name)
    if (req.file) {
        
        let parts = category.image.split(`${req.protocol}://${req.get("host")}/`);
        const imageName = parts[parts.length - 1];
        fs.unlinkSync(imageName,(err) => {
            if (err) {
                console.error('Error in deleting old image:', err);
            }
        });
        req.body.image = req.file.filename;
    }

    let newcategory = await Category.findByIdAndUpdate(req.params.id, req.body , {new:true})
     res.json({message:'success',newcategory})
}
)

const deleteCategory = catchError(async(req,res,next)=>{
    let category = await Category.findById(req.params.id)
    if(!category) return next(new AppError('category not found',404))
    

    let parts = category.image.split(`${req.protocol}://${req.get("host")}/`);
    const imageName = parts[parts.length - 1];
    fs.unlinkSync(imageName,(err) => {
        if (err) {
            console.error('Error in deleting old image:', err);
        }
    });
    

            
     await Category.findByIdAndDelete(req.params.id)
     res.json({message:'success'})
    
}
)


export{
    addCategory,
    allCategories,
    getCategory,
    updateCategory,
    deleteCategory

}