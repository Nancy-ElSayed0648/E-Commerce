import { Router } from "express";
import { addUser, allUsers, deleteUser, getUser, updateUser } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { addUserValidation, deleteUserValidation, UpdateUserValidation } from "./user.validation.js";



const UserRouter = Router();

UserRouter.route('/')
    .post(protectedRoutes,allowedTo('admin'),checkEmail,validate(addUserValidation),addUser)
    .get(allUsers)
UserRouter.route('/:id')
    .get(getUser)
    .put(protectedRoutes,allowedTo('admin','user'),checkEmail,validate(UpdateUserValidation),updateUser)
    .delete(protectedRoutes,allowedTo('admin','user'),checkEmail,validate(deleteUserValidation),deleteUser)



export default UserRouter
