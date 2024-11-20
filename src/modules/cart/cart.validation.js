import Joi from 'joi'



const addToCartValidation = Joi.object({

    product:Joi.string().hex().length(24).required(),
    quantity:Joi.number().integer().required(),
        
})


const updateQuantityValidation = Joi.object({
    id:Joi.string().hex().length(24).required(),
    quantity:Joi.number().integer().required()

})

const removeItemFromCartValidation = Joi.object({
    id:Joi.string().hex().length(24).required()

})

const applyCouponValidation = Joi.object({
    code:Joi.string().required()

})




export{
    addToCartValidation,
    updateQuantityValidation,
    removeItemFromCartValidation,
    applyCouponValidation
}