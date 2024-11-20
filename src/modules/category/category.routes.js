import { Router } from "express";
import { addCategory, allCategories, deleteCategory, getCategory, updateCategory } from "./category.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addCategoryValidation, deleteCategoryValidation, updateCategoryValidation } from "./category.validation.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";


const categoryRouter = Router()

categoryRouter.use('/:category/subCategories',subCategoryRouter)

categoryRouter.route('/')
    .post(protectedRoutes,allowedTo('admin'),uploadSingleFile('image' , 'categories'),validate(addCategoryValidation,'image'),addCategory)
    .get(allCategories)
categoryRouter.route('/:id')
    .get(getCategory)
    .put(protectedRoutes,allowedTo('admin'),uploadSingleFile('image' , 'categories'),validate(updateCategoryValidation,'image'),updateCategory)
    .delete(protectedRoutes,allowedTo('admin'),validate(deleteCategoryValidation),deleteCategory)



export default categoryRouter