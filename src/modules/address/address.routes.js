import { Router } from "express";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { addAddress, getLoggedUserAddresses, removeAddress } from "./address.controller.js";
import { validate } from "../../middleware/validate.js";
import { addAddressValidation, deleteAddressValidation } from "./address.validation.js";


const addressRouter = Router()

addressRouter.route('/')
    .put(protectedRoutes,allowedTo('user'),validate(addAddressValidation),addAddress)
    .get(protectedRoutes,allowedTo('user'),getLoggedUserAddresses)
addressRouter.route('/:id')
    .delete(protectedRoutes,allowedTo('user','admin'),validate(deleteAddressValidation),removeAddress)



export default addressRouter