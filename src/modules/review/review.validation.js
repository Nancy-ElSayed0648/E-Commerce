import Joi from 'joi'



const addReviewValidation = Joi.object({
    Product:Joi.string().hex().length(24).required(),
    comment:Joi.string().required(),
    rate:Joi.number().integer().min(1).max(5).required(),


})

const updateReviewValidation = Joi.object({
    id:Joi.string().hex().length(24).required(),
    comment:Joi.string().optional(),
    rate:Joi.number().integer().min(1).max(5).optional(),


})


const deleteReviewValidation = Joi.object({
    id:Joi.string().hex().length(24).required(),

})


export {
    addReviewValidation,
    updateReviewValidation,
    deleteReviewValidation
}