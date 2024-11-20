import { User } from "../../database/models/user.model.js"
import { AppError } from "../utils/appError.js"




export const checkEmail = async(req,res,next)=>{
    let isExist = await User.findOne({email :req.body.email})
    if(isExist) return next(new AppError("Email is already exist",409))
        next()

}