import { Router } from "express";
import {  addToCart, applyCoupon, clearUserCart, getLoggedUserCart, removeItemFromCart, updateQuantity } from "./cart.controller.js";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { addToCartValidation, applyCouponValidation, removeItemFromCartValidation, updateQuantityValidation } from "./cart.validation.js";


const cartRouter = Router()
cartRouter.use(protectedRoutes,allowedTo('user'))
cartRouter.route('/')
    .post(validate(addToCartValidation),addToCart)
    .get(getLoggedUserCart)
    .delete(clearUserCart)
cartRouter.route('/:id')
    .put(validate(updateQuantityValidation),updateQuantity)
    .delete(validate(removeItemFromCartValidation),removeItemFromCart)

cartRouter.post('/apply-coupon',validate(applyCouponValidation),applyCoupon)

export default cartRouter