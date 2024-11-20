import mongoose, { Types } from "mongoose";
import slugify from "slugify";



const schema = new mongoose.Schema({
    
        name:{
            type:String,
            unique:true,
            requireed:true,
            trim:true,
            minLength:[2,'too short subcategory name']
        },
        slug:{
            type:String,
            lowercase:true,
            
        },
        category:{
            type:Types.ObjectId,
            ref:'Category',
            requireed:true
        },
        createdBy:{
            type:Types.ObjectId,
            ref:'User'
        }
},{
    timestamps:true,
    versionKey:false
})


schema.pre('save',function(){ 
    this.slug = slugify(this.name)
})








export const SubCategory = mongoose.model('SubCategory' , schema)
