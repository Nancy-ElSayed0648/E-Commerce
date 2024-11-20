import Joi from 'joi'



const addUserValidation = Joi.object({
    name: Joi.string().pattern(/^[A-Za-z\s]+$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    role: Joi.string().valid('admin', 'user').default('user').optional()
})

const UpdateUserValidation = Joi.object({
    name: Joi.string().pattern(/^[A-Za-z\s]+$/).optional(),
    email: Joi.string().email().optional(),
    role: Joi.string().valid('admin', 'user').optional(),
    id: Joi.string().hex().length(24).required()
})

const deleteUserValidation = Joi.object({
    id: Joi.string().hex().length(24).required()

})




export{
    addUserValidation,
    UpdateUserValidation,
    deleteUserValidation

}