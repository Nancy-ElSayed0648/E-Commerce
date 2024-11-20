import mongoose from "mongoose";




const schema = new mongoose.Schema({
    code:{
        type:String,
        unique:true,
        required:true
    },
    expires:Date,
    discount:Number
},{
    timestamps:true,
    versionKey:false
})


export const Coupon = mongoose.model('Coupon', schema)