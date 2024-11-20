import { User } from "../../database/models/user.model.js";
import { catchError } from "../middleware/catchError.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AppError } from "../utils/appError.js";
import { sendEmail } from "../email/nodemailer.js";
import { htmlCode } from "../email/html.js";

const signUp = catchError(async (req,res,next) => {
    let user = new User(req.body)

    let code = Math.floor(100000 + Math.random() * 900000)
    user.otpCode = code
    user.otpExpire =Date.now() + 5 * 60 * 1000; // 5 minutes
    
    await user.save()
    
    sendEmail({email:user.email,subject:"verify email" ,html:htmlCode(user.otpCode)})
    let token = jwt.sign({ userId : user._id ,email : user.email , password :user.password },process.env.JWT_KEY,{ expiresIn:'1d' })
    res.json({message : "success" , token})
})



const signIn = catchError(async(req,res,next)=>{
    let user = await User.findOne({email:req.body.email})
    if(user.verified == false) {
        let code = Math.floor(100000 + Math.random() * 900000)
        user.otpCode = code
        user.otpExpire =Date.now() + 5 * 60 * 1000; // 5 minutes
        await user.save()
        sendEmail({email:user.email,subject:"verify email" ,html:htmlCode(user.otpCode)})
        
    }
    if(user && bcrypt.compareSync(req.body.password , user.password)){
        let token = jwt.sign({userId:user._id,email:user.email , password:user.password  , role :user.role},process.env.JWT_KEY,{ expiresIn:'1d' })
        await User.findByIdAndUpdate(user._id,{isActive:true},{new:true})
        return res.json({message : "success" , token})
    }
    next(new AppError("incorrect email or password" , 401))
})

const confirmEmail = catchError(async(req,res,next)=>{
    const {token} = req.headers
    let userPayload=null
    jwt.verify(token , process.env.JWT_KEY ,(err,payload)=>{
        if(err) return next(new AppError(err , 401))
            userPayload = payload
    })

    let user = await User.findOne({_id:userPayload.userId,verified:false})
    console.log(user);
    
    if(!user) return next(new AppError("invalid email or email already verified",400))
    if(user.otpCode != req.body.code) return next(new AppError("invalid otp code",400))

    if(user.otpExpire < Date.now()) return next(new AppError("code expired",404))
        user.verified = true
        user.isActive =true
        user.otpCode=undefined
        user.otpExpire=undefined
        await user.save()
        res.status(201).json({message:'email confirmed successfuly'})
    
    
}) 


const logOut =catchError(async(req,res)=>{
    const user = await User.findOne(req.user._id)
    user.logoutAt = Date.now()
    user.isActive =false
    await user.save();
    res.status(200).json({message:"successe" ,user})
})


const changePassword = catchError(async(req,res,next)=>{
    let user = await User.findById(req.user._id)
    if(user && bcrypt.compareSync(req.body.oldPassword , user.password)){

        await User.findByIdAndUpdate(req.user._id,{password:req.body.newPassword ,passwordChangedAt:Date.now()},{new:true})
        let token = jwt.sign({userId:user._id,email:user.email , password:user.password , role :user.role},process.env.JWT_KEY)
        
        return res.json({message : "success" , token,user})
    }
    next(new AppError('Incorrect old password' , 401))
})


const forgetPassword = catchError(async(req,res,next)=>{
    const {email} =req.body
    const user = await User.findOne({email})
    if(!user) return next(new AppError("user not exist", 409))

    const token =jwt.sign({email},process.env.TOKENSIGNETURE)
    const resetPassword =`${req.protocol}://${req.headers.host}/resetPassword/${token}`

    let randomCode = Math.floor(100000 + Math.random() * 900000)
    let expireDate = Date.now() + 5 * 60 * 1000; // 5 minutes

    const htmlcode =`<a href="${resetPassword}">resetPassword</a>
                     <p>${randomCode}</p> `

    user.resetCode = randomCode
    user.resetExpire = expireDate
    await user.save();
    sendEmail({email,subject:'resetPassword' , html:htmlcode})
    res.status(200).json({message:'success'})


})



 const resetPassword = catchError(async(req,res,next)=>{
    const {token} =req.params
    const {newPassword,resetCode} =req.body
    jwt.verify(token,process.env.TOKENSIGNETURE,async(err,decoded)=>{
        if(err) return next(new AppError("error in token",404))

        const user = await User.findOne({email:decoded.email})
        if (!user) return next(new AppError("email not exist", 409));
            
          
        if(!resetCode)  return next(new AppError("resetCode is required", 409));
        if( !bcrypt.compareSync(resetCode, user.resetCode))  
            return next(new AppError("enter correct resetCode", 409));

          if( Date.now()> user.resetExpire)  return next(new AppError("reset code expired", 409))
          
        const hash =bcrypt.hashSync(newPassword ,8)  
        const newUser = await User.findOneAndUpdate({email : decoded.email },{password:hash},{new:true})
        return res.status(200).json({message:"done",newUser})
    })
    
    
})


const protectedRoutes = catchError(async(req,res,next)=>{
    let {token} = req.headers
    let userPayload = null
    if (!token) return next(new AppError("token not provided " , 401))
    
    jwt.verify(token , process.env.JWT_KEY ,(err,payload)=>{
        if(err) return next(new AppError(err , 401))
            userPayload = payload
    })

    let user = await User.findById(userPayload.userId)
    if(!user) return next(new AppError("user not found" , 401))
    if(user.blocked == true) return next(new AppError("user blocked" , 401))
    if(user.verified == false) return next(new AppError("email not verified" , 401))
    if(user.isActive == false) return next(new AppError("login first" , 401))
    if(user.logoutAt){
        let logoutTime = parseInt(user.logoutAt.getTime()/1000)
        if(logoutTime>userPayload.iat) return next(new AppError("invalid token .. login again" , 401))
    }
    if(user.passwordChangedAt){
        let changedTime = parseInt(user.passwordChangedAt.getTime()/1000)
        if(changedTime>userPayload.iat) return next(new AppError("invalid token .. login again" , 401))
    }
    

    req.user = user
    
    next()
})


const allowedTo = (...roles)=>{
    return catchError(async(req,res,next)=>{
        if(!roles.includes(req.user.role))
            return next(new AppError("you do not have permission to perform this action" , 401))
        next()
        
    })
}
    






export {
    signUp,
    signIn,
    changePassword,
    logOut,
    protectedRoutes,
    allowedTo,
    confirmEmail,
    forgetPassword,
    resetPassword

}