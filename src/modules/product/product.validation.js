import Joi from 'joi'



const addProductValidation = Joi.object({
    title:Joi.string().min(3).max(30).required(),
    description :Joi.string().min(3).max(300).required(),
    price: Joi.number().min(0).required(),
    priceAfterDiscount:Joi.number().min(0).required(),
    stock:Joi.number().min(0).required(),
    category:Joi.string().hex().length(24).required(),
    subCategory:Joi.string().hex().length(24).required(),
    brand:Joi.string().hex().length(24).required(),
    createdBy:Joi.string().hex().length(24).optional(),
    imageCover:Joi.array().items(Joi.object({
        fieldname:Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/gif','image/jpg').required(),
        size:Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
    }).required(),).required(),
    images:Joi.array().items(Joi.object({
        fieldname:Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/gif','image/jpg').required(),
        size:Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
    }).required(),).required()


    

})


const updateProductValidation = Joi.object({
    id:Joi.string().hex().length(24).required(),
    title:Joi.string().min(3).max(30),
    description :Joi.string().min(3).max(300),
    price: Joi.number().min(0),
    priceAfterDiscount:Joi.number().min(0),
    stock:Joi.number().min(0),
    category:Joi.string().hex().length(24),
    subCategory:Joi.string().hex().length(24),
    brand:Joi.string().hex().length(24),
    createdBy:Joi.string().hex().length(24).optional(),
    imageCover:Joi.array().items(Joi.object({
        fieldname:Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/gif','image/jpg').required(),
        size:Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
    }).required()),
    images:Joi.array().items(Joi.object({
        fieldname:Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png','image/gif','image/jpg').required(),
        size:Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
    }).required())


    

})


const deleteProductValidation = Joi.object({
    id:Joi.string().hex().length(24).required()
})


export{
    addProductValidation,
    updateProductValidation,
    deleteProductValidation
}