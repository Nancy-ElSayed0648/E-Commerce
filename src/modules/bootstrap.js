import authRouter from "../auth/auth.routes.js"
import addressRouter from "./address/address.routes.js"
import brandRouter from "./brand/brand.routes.js"
import cartRouter from "./cart/cart.routes.js"
import categoryRouter from "./category/category.routes.js"
import couponRouter from "./coupon/coupon.routes.js"
import orderRouter from "./order/order.routes.js"
import productRouter from "./product/product.routes.js"
import reviewRouter from "./review/review.routes.js"
import subCategoryRouter from "./subCategory/subCategory.routes.js"
import UserRouter from "./user/user.routes.js"
import wishlistRouter from "./wishlist/wishlist.routes.js"



export const bootstarp = (app)=>{
    app.use('/api/categories', categoryRouter)
    app.use('/api/subCategories', subCategoryRouter)
    app.use('/api/brands', brandRouter)
    app.use('/api/products', productRouter)
    app.use('/api/users', UserRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/reviews', reviewRouter)
    app.use('/api/wishlists', wishlistRouter)
    app.use('/api/addresses', addressRouter)
    app.use('/api/coupons',couponRouter)
    app.use('/api/carts',cartRouter)
    app.use('/api/orders',orderRouter)

}