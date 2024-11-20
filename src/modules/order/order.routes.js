
import { Router } from "express";

import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { createCashOrder, createCheckoutSession, getAllOrders, getUserOrders } from "./order.controller.js";
import { validate } from "../../middleware/validate.js";
import { createCashOrderValidation, createCheckoutValidation } from "./order.validation.js";



const orderRouter = Router()

orderRouter.get('/user',protectedRoutes,allowedTo('user'),getUserOrders)
orderRouter.get('/',protectedRoutes,allowedTo('admin'),getAllOrders)
    

orderRouter.route('/:id')
    .post(protectedRoutes,allowedTo('user'),validate(createCashOrderValidation),createCashOrder)

orderRouter.post('/checkout/:id',protectedRoutes,allowedTo('user'),validate(createCheckoutValidation),createCheckoutSession)


export default orderRouter

