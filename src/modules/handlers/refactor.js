import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"
import fs from "fs"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import { AppError } from "../../utils/appError.js"
import { Category } from "../../../database/models/category.model.js"





const addOne = (model,name)=>{
    return catchError(async(req,res,next)=>{
        

        let document = new model(req.body)

        if (name === 'brand') {
            document.logo = req.file.filename
        } else if (name === 'product') {
            document.imageCover = req.files.imageCover[0].filename
            document.images = req.files.images.map(img=>img.filename)
        } else if (name === 'category') {
            document.image = req.file.filename
        }

        await document.save()
        let response = {}
        response[name]=document
        res.status(201).json({message:'success',...response})
    })
    
}
const allData = (model,name)=>{
    return catchError(async (req,res,next)=>{
        let filterObj ={}
        if(req.params.category) {
            let category = await Category.findById(req.params.category)
            if(!category) return next(new AppError('category not found',404))
            filterObj.category =category._id
        }
        let apiFeatures = new ApiFeatures(model.find(filterObj),req.query)
        .pagination().fields().filter().search().sort()
        
        let document = await apiFeatures.mongooseQuery
        let response = {}
        response[name]=document
        res.status(201).json({message:'success',page:apiFeatures.pageNumber,...response})
    })
    
}

const getOne = (model,name)=>{
    return catchError(async(req,res,next)=>{
        let document=await model.findById(req.params.id)
        let response = {} 
        response[name]=document
        document || next(new AppError(`${name} not found`,404))
        !document || res.status(201).json({message:'success',...response})
    })
}

const updateOnee = (model,name)=>{
    return catchError(async(req,res,next)=>{
        
        let document = await model.findByIdAndUpdate(req.params.id, req.body , {new:true})
        let response = {}
        response[name]=document
        document || next(new AppError(`${name} not found`,404))
        !document || res.status(201).json({message:'success',...response})
    })
}

const deleteOne = (model,name)=>{
    return catchError(async(req,res,next)=>{
        let document = await model.findByIdAndDelete(req.params.id)
        let response = {}
        response[name]=document
        document || next(new AppError(`${name} not found`,404))
        !document || res.status(201).json({message:'success',...response})
})
}



export{
    addOne,
    allData,
    getOne,
    updateOnee,
    deleteOne

}