import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
import { Brand } from "../../../database/models/brand.model.js"
import { addOne, allData, deleteOne, getOne, updateOnee } from "../handlers/refactor.js"
import { Review } from "../../../database/models/review.model.js"





const addReview = catchError(async(req,res,next)=>{
    req.body.user = req.user._id
    let isExist = await Review.findOne({user:req.user._id , Product:req.body.Product})
    if(isExist) return next(new AppError("you already created review for this product befor", 409))
    let review = new Review(req.body)
    await review.save()
    res.status(201).json({message:"Review added successfully",review})
})


const allReviews =allData(Review,'reviews')


const getReview = getOne(Review,'review')


const updateReview =catchError(async(req,res,next)=>{
    let review = await Review.findOneAndUpdate({_id:req.params.id , user:req.user._id},req.body,{new:true})
    review || next(AppError("review not found or you are not created review" , 404))
    !review|| res.status(201).json({message:"Review updated successfully",review})
})

const deleteReview = deleteOne(Review,'review')



export{
    addReview,
    allReviews,
    getReview,
    updateReview,
    deleteReview

}