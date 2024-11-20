import { Router } from "express";
import { addSubCategory, allSubCategories, deleteSubCategory, getSubCategory, updateSubCategory } from "./subCategory.controller.js";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { addSubCategoryValidation, deleteSubCategoryValidation, updateSubCategoryValidation } from "./subCategory.validation.js";


const subCategoryRouter = Router({mergeParams:true})

subCategoryRouter.route('/')
    .post(protectedRoutes,allowedTo('admin'),validate(addSubCategoryValidation),addSubCategory)
    .get(allSubCategories)
subCategoryRouter.route('/:id')
    .get(getSubCategory)
    .put(protectedRoutes,allowedTo('admin'),validate(updateSubCategoryValidation),updateSubCategory)
    .delete(protectedRoutes,allowedTo('admin'),validate(deleteSubCategoryValidation),deleteSubCategory)



export default subCategoryRouter