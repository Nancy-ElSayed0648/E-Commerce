import { Router } from "express";
import { changePassword, confirmEmail, forgetPassword, logOut, protectedRoutes, resetPassword, signIn, signUp } from "./auth.controller.js";
import { checkEmail } from "../middleware/checkEmail.js";
import { validate } from "../middleware/validate.js";
import { changePasswordValidation, confirmEmailValidation, forgetPasswordValidation, resetPasswordValidation, signInValidation, signUpValidation } from "./auth.validation.js";





const authRouter = Router();

authRouter.post('/signUp',checkEmail,validate(signUpValidation),signUp)
authRouter.post('/signIn',validate(signInValidation),signIn)
authRouter.patch('/change-password',protectedRoutes,validate(changePasswordValidation),changePassword)
authRouter.put('/verify',validate(confirmEmailValidation),confirmEmail)
authRouter.post('/forget-password',validate(forgetPasswordValidation),forgetPassword)
authRouter.post('/reset-password/:token',validate(resetPasswordValidation),resetPassword)
authRouter.patch('/log-out',protectedRoutes,logOut)




export default authRouter
