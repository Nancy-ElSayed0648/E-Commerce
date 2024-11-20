
import { catchError } from "../../middleware/catchError.js"

import { Cart } from "../../../database/models/cart.model.js"
import { Product } from "../../../database/models/product.model.js"
import { AppError } from "../../utils/appError.js"
import { Coupon } from "../../../database/models/coupon.model.js"


function calcTotalPrice(isCartExist){
    isCartExist.totalCartPrice = 
        isCartExist.cartItems.reduce((prev,item)=>prev += item.quantity * item.price , 0)
    if(isCartExist.discount){
        isCartExist.totalCartPriceAfterDiscount = isCartExist.totalCartPrice - (isCartExist.totalCartPrice*isCartExist.discount)/100
    }
}


const addToCart = catchError(async(req,res,next)=>{
    let isCartExist = await Cart.findOne({user:req.user._id})

    let product = await Product.findById(req.body.product)
        if(!product) return next(new AppError("Product not found",404))
        req.body.price = product.price
        
        if(req.body.quantity>product.stock) return next(new AppError('sold out',404))

    if(!isCartExist){
        let cart = new Cart({user:req.user._id ,cartItems:[req.body]})
        calcTotalPrice(cart)
        await cart.save()
        res.status(201).json({message:"cart created successfully",cart})
    }else{
        let item = isCartExist.cartItems.find(item => item.product == req.body.product)
        if(item) {
            item.quantity += req.body.quantity || 1
            if(item.quantity>product.stock) return next(new AppError('sold out',404))
        
        }
        if(!item) isCartExist.cartItems.push(req.body)
        calcTotalPrice(isCartExist)
        await isCartExist.save()
        res.status(200).json({message:"item added to cart successfully",cart:isCartExist})
    }
})

const updateQuantity = catchError(async(req,res,next)=>{
    let cart = await Cart.findOne({user:req.user._id})
    let item = cart.cartItems.find(item=>item.product == req.params.id)
    if(!item) return next(new AppError("item not found in cart",404))
    
    item.quantity = req.body.quantity
    calcTotalPrice(cart)
    await cart.save()
    res.status(200).json({message:"quantity updated successfully",cart})
})

const removeItemFromCart= catchError(async(req,res,next)=>{
    let cart = await Cart.findOneAndUpdate({user:req.user._id},
        {$pull:{cartItems:{_id:req.params.id}}},{new:true})
    calcTotalPrice(cart)
    await cart.save()
    cart || next(new AppError('cart not found',404))
    !cart || res.status(200).json({message:"item removed from cart successfully",cart})

})


const getLoggedUserCart =catchError(async(req,res,next)=>{
    let cart = await Cart.findOne({user:req.user._id}).populate('cartItems.product')
    cart || next(new AppError('cart not found',404))
    !cart || res.status(200).json({message:"cart found successfully",cart})

})

const clearUserCart =catchError(async(req,res,next)=>{
    let cart = await Cart.findOneAndDelete({user:req.user._id})
    cart || next(new AppError('cart not found',404))
    !cart || res.status(200).json({message:"cart deleted successfully",cart})

})


const applyCoupon = catchError(async(req,res,next)=>{
    let coupon = await Coupon.findOne({code:req.body.code,expires:{$gte:Date.now()}})
    if(!coupon) return next(new AppError('invalid coupon',404))
    
    let cart = await Cart.findOne({user:req.user._id})
    if(!cart) return next(new AppError('cart not found',404))
    
    cart.discount = coupon.discount
    calcTotalPrice(cart)
    await cart.save()
    res.status(200).json({message:"coupon applied successfully",cart})

})




export{
    addToCart,
    updateQuantity,
    removeItemFromCart,
    getLoggedUserCart,
    clearUserCart,
    applyCoupon
    

}