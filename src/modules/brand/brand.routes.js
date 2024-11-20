import { Router } from "express";
import { addBrand, allBrands, deleteBrand, getBrand, updateBrand } from "./brand.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { addBrandValidation, deleteBrandValidation, updateBrandValidation } from "./brand.validation.js";


const brandRouter = Router()

brandRouter.route('/')
    .post(protectedRoutes,allowedTo('admin'),uploadSingleFile('logo' , 'brands'),validate(addBrandValidation,'logo'),addBrand)
    .get(allBrands)
brandRouter.route('/:id')
    .get(getBrand)
    .put(protectedRoutes,allowedTo('admin'),uploadSingleFile('logo' , 'brands'),validate(updateBrandValidation,'logo'),updateBrand)
    .delete(protectedRoutes,allowedTo('admin'),validate(deleteBrandValidation),deleteBrand)



export default brandRouter