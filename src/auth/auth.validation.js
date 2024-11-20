import Joi from 'joi'



const signUpValidation = Joi.object({
    name: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
})


const confirmEmailValidation = Joi.object({
    code: Joi.string().pattern(/^\d{6}$/).required(),
})

const signInValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
})

const changePasswordValidation = Joi.object({
    oldPassword: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    newPassword: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),

})

const forgetPasswordValidation = Joi.object({
   email: Joi.string().email().required(),
})

const resetPasswordValidation = Joi.object({
    newPassword: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    resetCode: Joi.string().pattern(/^\d{6}$/).required(),
    token:Joi.string().required()
   
})


export{
    signUpValidation,
    signInValidation,
    changePasswordValidation,
    forgetPasswordValidation,
    resetPasswordValidation,
    confirmEmailValidation

}