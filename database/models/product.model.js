import mongoose, { Types } from "mongoose";
import slugify from "slugify";


const schema = new mongoose.Schema({
    title:{
        type:String,
        unique:[true, ' title is required'],
        trim:true,
        required:true,
        minlength:[true, 'too short product title']
    },
    slug:{
        type:String,
        lowercase:true,
        
    },
    description:{
        type:String,
        required:true,
        minLength:30,
        maxLength:2000
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    priceAfterDiscount:{
        type:Number,
        required:true,
        min:0
    },
    sold:Number,
    stock:{
        type:Number,
        min:0
    },
    imageCover:String,
    images:[String],
    
    category:{
        type:Types.ObjectId,
        ref:'Category'
    },
    subCategory:{
        type:Types.ObjectId,
        ref:'subCategory'
    },
    brand:{
        type:Types.ObjectId,
        ref:'Brand'
    },
    rateAvg:{
        type:Number,
        min:0,
        max:5
    },
    reteCount:Number,
    createdBy:{
        type:Types.ObjectId,
        ref:'User'
    }
    
},{
    timestamps:true,
    versionkey:false,
    toJSON: { virtuals: true } ,
    id: false
})

schema.virtual('myReviews',{
    ref:'Review',
    localField:'_id',
    foreignField:'product'
})

schema.pre('findOne', function(){
    this.populate('myReviews')
})


schema.post('init',function(doc){
    if(doc.imageCover) doc.imageCover = process.env.BASE_URL + "products/" + doc.imageCover
    if(doc.images) doc.images = doc.images.map(img => process.env.BASE_URL + "products/" +img )
})


schema.pre('save',function(){ 
    this.slug = slugify(this.title)
    console.log(this.slug)
})

// schema.pre('save',function(){ 
//     req.body.imageCover = req.files.imageCover[0].filename

// })


//req.body.imageCover = req.files.imageCover[0].filename
//     req.body.images = req.files.images.map(img=>img.filename)

export const Product = mongoose.model('Product', schema)