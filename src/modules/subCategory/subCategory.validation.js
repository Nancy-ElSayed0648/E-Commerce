
import Joi from "joi";

const addSubCategoryValidation = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    category:Joi.string().hex().length(24).required()
})



const updateSubCategoryValidation = Joi.object({
    name: Joi.string().min(1).max(50),
    id:Joi.string().hex().length(24).required()

})
const deleteSubCategoryValidation = Joi.object({
    id:Joi.string().hex().length(24).required()

})



export{
    addSubCategoryValidation,
    updateSubCategoryValidation,
    deleteSubCategoryValidation
}