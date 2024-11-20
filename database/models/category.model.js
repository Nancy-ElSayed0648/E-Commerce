import  mongoose, { Types }  from "mongoose";
import slugify from "slugify";


const schema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,'name is required'],
        trime:true,
        required:true,
        minLength:[2,'too short category name']

    },
    slug:{
        type:String,
        lowercase:true,
       
    },
    image:{
        type:String
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User'
    }

},{
    timestamps:true,
    versionKey:false
})


schema.post('init',function(doc){
    if(doc.image) doc.image = process.env.BASE_URL +"categories/" + doc.image
})

schema.pre('save',function(){ 
    this.slug = slugify(this.name)
})








export const Category = mongoose.model("Category" , schema)