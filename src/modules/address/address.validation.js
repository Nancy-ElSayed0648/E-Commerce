import Joi from 'joi'



const addAddressValidation = Joi.object({
    city:Joi.string().required(),
    street:Joi.string().required(),
    phone:Joi.string().pattern(/^(002|\+2)?01[0125][0-9]{8}$/).required()
})


const deleteAddressValidation = Joi.object({
    id:Joi.string().hex().length(24).required()
})



export{
    addAddressValidation,
    deleteAddressValidation
}