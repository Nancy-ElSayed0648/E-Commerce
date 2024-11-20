import { Router } from "express";
import { addProduct, allProducts, deleteProduct, getProduct, updateProduct } from "./product.controller.js";
import { uploadMixOfFiles } from "../../fileUpload/fileUpload.js";
import { addProductValidation, deleteProductValidation, updateProductValidation } from "./product.validation.js";
import { validate } from "../../middleware/validate.js";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";



const productRouter = Router()

productRouter.route('/')
    .post(protectedRoutes,allowedTo('admin'),uploadMixOfFiles([{name:'imageCover' ,maxCount : 1},{name:'images' ,maxCount : 10}],'products'),validate(addProductValidation),addProduct)
    .get(allProducts)
productRouter.route('/:id')
    .get(getProduct)
    .put(protectedRoutes,allowedTo('admin'),uploadMixOfFiles([{name:'imageCover' ,maxCount : 1},{name:'images' ,maxCount : 10}],'products'),validate(updateProductValidation),updateProduct)
    .delete(protectedRoutes,allowedTo('admin'),validate(deleteProductValidation),deleteProduct)



export default productRouter