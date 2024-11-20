import { Cart } from "../../../database/models/cart.model.js"
import { Order } from "../../../database/models/order.model.js"
import { Product } from "../../../database/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"


import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51QMQY9L15ImBJJnP1hlmZZ4bAALAOg5DoruiFnw1XhqgIYi9THCZJFVQZm4do9R3J61ai91rZ1aLydeReNr1wH6x00wAHznVpl');





const createCashOrder = catchError(async(req,res,next)=>{
     // 1- get user cart by cartId
   let cart = await Cart.findById(req.params.id)
   if(!cart) return  next(new AppError('cart not found',404))
    // 2- total order price
    let totalOrderPrice = cart.totalCartPriceAfterDiscount ||cart.totalCartPrice
    // 3- create order
    let order = new Order({
        user:req.user._id,
        orderItems:cart.cartItems,
        shippingAddress:req.body.shippingAddress,
        totalOrderPrice

    })
    
    await order.save()
    // 4- increment sold & decrement stock
    let options  = cart.cartItems.map((item)=>{
        return ({
            updateOne:{
                "filter":{_id:item.product},
                "update":{$inc:{sold:item.quantity ,stock:-item.quantity}}
            }
        })
    })
    await Product.bulkWrite(options)
    // 5- clear user cart
    await Cart.findByIdAndDelete(cart._id)
    
    res.status(200).json({message:"Order created successfully",order})
    
})

const getUserOrders = catchError(async(req,res,next)=>{
    let orders = await Order.find({user:req.user._id}).populate('orderItems.product')
    res.status(200).json({message:"success",orders})
  
})

const getAllOrders = catchError(async(req,res,next)=>{
    let orders = await Order.find().populate('orderItems.product')
    res.status(200).json({message:"success",orders})

   
})


const createCheckoutSession = catchError(async(req,res,next)=>{
    let cart = await Cart.findById(req.params.id)
    if(!cart) return  next(new AppError('cart not found',404))
    let totalOrderPrice = cart.totalCartPriceAfterDiscount ||cart.totalCartPrice
    let session = await stripe.checkout.sessions.create({
        line_items:[{
            price_data:{
                currency:'egp',
                unit_amount:totalOrderPrice *100 ,
                product_data:{
                    name:req.user.name
                }
            },
            quantity:1,

        }],
        mode:'payment',
        success_url:req.protocol+'://'+req.get('host')+'/orders',
        cancel_url:req.protocol+'://'+req.get('host')+'/carts',
        customer_email:req.user.email,
        client_reference_id:req.params.id, //cartId
        metadata:req.body.shippingAddress //store addetional info

    })
    res.status(200).json({message:"success",session})

   
})






export{
    createCashOrder,
    getUserOrders,
    getAllOrders,
    createCheckoutSession

}