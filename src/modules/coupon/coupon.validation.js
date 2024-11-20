
import Joi from 'joi'



const addCouponValidation = Joi.object({
    code:Joi.string().required(),
    expires:Joi.date().greater('now').required(),
    discount:Joi.number().integer().min(1).max(100).required(),
    

})

const updateCouponValidation = Joi.object({
    id:Joi.string().hex().length(24).required(),
    code:Joi.string().optional(),
    expires:Joi.date().greater('now').optional(),
    discount:Joi.number().integer().min(1).max(100).optional(),
   


})


const deleteCouponValidation = Joi.object({
    id:Joi.string().hex().length(24).required(),

})


export {
    addCouponValidation,
    updateCouponValidation,
    deleteCouponValidation
}