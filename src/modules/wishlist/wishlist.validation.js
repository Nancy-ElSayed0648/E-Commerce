import Joi from 'joi'



const addToWishlistValidation = Joi.object({
    product:Joi.string().hex().length(24).required()
})


const removeFromWishlistValidation = Joi.object({
    id:Joi.string().hex().length(24).required()
})



export{
    addToWishlistValidation,
    removeFromWishlistValidation
}