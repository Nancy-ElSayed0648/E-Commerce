import { Router } from "express";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { addToWishlist, getLoggedUserWishlist, removeFromWishlist } from "./wishlist.controller.js";
import { validate } from "../../middleware/validate.js";
import { addToWishlistValidation, removeFromWishlistValidation } from "./wishlist.validation.js";


const wishlistRouter = Router()

wishlistRouter.route('/')
    .put(protectedRoutes,allowedTo('user'),validate(addToWishlistValidation),addToWishlist)
    .get(protectedRoutes,allowedTo('user'),getLoggedUserWishlist)
wishlistRouter.route('/:id')
    .delete(protectedRoutes,allowedTo('user','admin'),validate(removeFromWishlistValidation),removeFromWishlist)



export default wishlistRouter