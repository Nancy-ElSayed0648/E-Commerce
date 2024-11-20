import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    passwordChangedAt: Date,
    
    isActive:{
        type:Boolean,
        default:false
    },
    verified:{
        type:Boolean,
        default:false
    },
    blocked:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    wishlist:[{
        type : mongoose.Types.ObjectId,
        ref: 'Product'
    }],
    addresses:[{
        city:String,
        street:String,
        phone:String
    }],
    otpCode: String,
    otpExpire:Date,
    logoutAt:Date,
    resetCode:String,
    resetExpire:Date
    
},{
    timestamps:true,
    versionkey:false
    
})

schema.pre('save',function(){
    
if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password , 8)
}
})

schema.pre('findOneAndUpdate' , function(){
    if(this._update.password) this._update.password = bcrypt.hashSync(this._update.password , 8)
})

schema.pre( 'save', function(){
    if(this.isModified('resetCode')){
        
        const encryptedCode =  bcrypt.hashSync(this.resetCode, 8);
        this.resetCode = encryptedCode;
        console.log(encryptedCode)
        console.log('123')
    }
})


export const User = mongoose.model('User', schema)