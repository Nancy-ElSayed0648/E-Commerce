import mongoose, { Types } from "mongoose";
import slugify from "slugify";


const schema = new mongoose.Schema({
    name: {
        type:String,
        unique:true,
        trime:true,
        required:true,
        minLength:[1,'too short brand name ']
    },
    slug:{
        type:String,
        lowercase:true,
        
    },
    logo:String,
    createdBy:{
        type:Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true,
    versionkey:false
    
})


// const setImageURL = (doc) => {
//     if (doc.imageCover) {
//       const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
//       doc.imageCover = imageUrl;
//     }
//     if (doc.images) {
//       const imagesList = [];
//       doc.images.forEach((image) => {
//         const imageUrl = `${process.env.BASE_URL}/products/${image}`;
//         imagesList.push(imageUrl);
//       });
//       doc.images = imagesList;
//     }
//   };
//   // findOne, findAll and update
//   productSchema.post('init', (doc) => {
//     setImageURL(doc);
//   });
  
//   // create
//   productSchema.post('save', (doc) => {
//     setImageURL(doc);
//   });
  





schema.post('init',function(doc){
    if(doc.logo) doc.logo = process.env.BASE_URL + "brands/" + doc.logo
    
})



schema.pre('save',function(){ 
    this.slug = slugify(this.name)
    console.log(this.slug)
})



export const Brand = mongoose.model('Brand' , schema)