import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
import { Brand } from "../../../database/models/brand.model.js"
import { addOne, allData, deleteOne, getOne, updateOnee } from "../handlers/refactor.js"
import fs from 'fs'





const addBrand = addOne(Brand,'brand')
// catchError(async(req,res,next)=>{
//     req.body.slug = slugify(req.body.name)
//     req.body.logo = req.file.filename
//     let brand = new Brand(req.body)
//     await brand.save()
//     res.json({message:'success',brand})
// })

const allBrands =allData(Brand,'brands')
// catchError(async (req,res,next)=>{
//     let brands = await Brand.find()
//     res.json({message:'success',brands})
// })

const getBrand = getOne(Brand,'brand')
// catchError(async(req,res,next)=>{
//     let brand=await Brand.findById(req.params.id)
//     brand || next(new AppError('brand not found',404))
//     !brand || res.json({message:'success',brand})
// })




const updateBrand = catchError(async(req,res,next)=>{
    let brand = await Brand.findById(req.params.id)
    if(!brand) return next(new AppError('brand not found',404))
    if(req.body.name) req.body.slug = slugify(req.body.name)
    if (req.file) {
        
        let parts = brand.logo.split(`${req.protocol}://${req.get("host")}/`);
        const imageName = parts[parts.length - 1];
        fs.unlinkSync(imageName,(err) => {
            if (err) {
                console.error('Error in deleting old image:', err);
            }
        });
        req.body.logo = req.file.filename;
    }

    let newBrand = await Brand.findByIdAndUpdate(req.params.id, req.body , {new:true})
     res.json({message:'success',newBrand})
}
)

const deleteBrand =catchError(async(req,res,next)=>{
    let brand = await Brand.findById(req.params.id)
    if(!brand) return next(new AppError('brand not found',404))
    

    let parts = brand.logo.split(`${req.protocol}://${req.get("host")}/`);
    const imageName = parts[parts.length - 1];
    fs.unlinkSync(imageName,(err) => {
        if (err) {
            console.error('Error in deleting old image:', err);
        }
    });
    
     await Brand.findByIdAndDelete(req.params.id)
      res.json({message:'success'})
}
)


export{
    addBrand,
    allBrands,
    getBrand,
    updateBrand,
    deleteBrand

}