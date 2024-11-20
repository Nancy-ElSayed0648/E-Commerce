
import Joi from "joi";

const addBrandValidation = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    logo: Joi.object({
        fieldname:Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/gif','image/jpg').required(),
        size:Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
    }).required()
})



const updateBrandValidation = Joi.object({
    name: Joi.string().min(1).max(50),
    logo: Joi.object({
        fieldname:Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/gif','image/jpg').required(),
        size:Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
    }),
    id:Joi.string().hex().length(24).required()

})

const deleteBrandValidation = Joi.object({
    id:Joi.string().hex().length(24).required()

})


export{
    addBrandValidation,
    updateBrandValidation,
    deleteBrandValidation
}