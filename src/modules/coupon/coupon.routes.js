import { Router } from "express";
import {  addCoupon,  allCoupons, deleteCoupon, getCoupon,  updateCoupon } from "./coupon.controller.js";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { addCouponValidation, deleteCouponValidation, updateCouponValidation } from "./coupon.validation.js";


const couponRouter = Router()
couponRouter.use(protectedRoutes,allowedTo('admin'))
couponRouter.route('/')
    .post(validate(addCouponValidation),addCoupon)
    .get(allCoupons)
couponRouter.route('/:id')
    .get(getCoupon)
    .put(validate(updateCouponValidation),updateCoupon)
    .delete(validate(deleteCouponValidation),deleteCoupon)



export default couponRouter