import { Router } from "express";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { addReview, allReviews, deleteReview, getReview, updateReview } from "./review.controller.js";
import { validate } from "../../middleware/validate.js";
import { addReviewValidation, deleteReviewValidation, updateReviewValidation } from "./review.validation.js";


const reviewRouter = Router()

reviewRouter.route('/')
    .post(protectedRoutes,allowedTo('user'),validate(addReviewValidation),addReview)
    .get(allReviews)
reviewRouter.route('/:id')
    .get(getReview)
    .put(protectedRoutes,allowedTo('user'),validate(updateReviewValidation),updateReview)
    .delete(protectedRoutes,allowedTo('user','admin'),validate(deleteReviewValidation),deleteReview)



export default reviewRouter