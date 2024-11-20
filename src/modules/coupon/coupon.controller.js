import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
import { Brand } from "../../../database/models/brand.model.js"
import { addOne, allData, deleteOne, getOne, updateOnee } from "../handlers/refactor.js"
import { Coupon } from "../../../database/models/coupon.model.js"





const addCoupon = catchError(async(req,res,next)=>{
    let isExist = await Coupon.findOne({code:req.body.code})
    if(isExist) return next(new AppError("Coupon code already exist",409))
    let coupon = new Coupon(req.body)
    await coupon.save()
    res.status(201).json({message:"Coupon added successfully",coupon})
})


const allCoupons =allData(Coupon,'coupons')


const getCoupon = getOne(Coupon,'coupon')


const updateCoupon = updateOnee(Coupon,'coupon')

const deleteCoupon = deleteOne(Coupon,'coupon')



export{
    addCoupon,
    allCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon

}