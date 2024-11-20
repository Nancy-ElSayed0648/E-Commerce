import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
import { Product } from "../../../database/models/product.model.js"
import { addOne, allData, deleteOne, getOne,updateOnee } from "../handlers/refactor.js"
import fs from 'fs'



const addProduct = addOne(Product,'product')
// catchError(async(req,res,next)=>{
//     req.body.slug = slugify(req.body.title)
//     req.body.imageCover = req.files.imageCover[0].filename
//     req.body.images = req.files.images.map(img=>img.filename)
//     let product = new Product(req.body)
//     await product.save()
//     res.json({message:'success',product})
// })

const allProducts = allData(Product,'products')
// catchError(async (req,res,next)=>{
//     let products = await Product.find()
//     res.json({message:'success',products})
// })

const getProduct = getOne(Product,'product')
// catchError(async(req,res,next)=>{
//     let product=await Product.findById(req.params.id)
//     product || next(new AppError('product not found',404))
//     !product || res.json({message:'success',product})
// })


const updateProduct = catchError(async(req,res,next)=>{
    
    if(req.body.title) req.body.slug = slugify(req.body.title)
        
           
        
    let product = await Product.findById(req.params.id);
    if (!product) return next(new AppError("Product not found", 404));

    if (req.files) {
        // Update imageCover if provided
        if (req.files.imageCover && req.files.imageCover.length > 0) {
            const partsCover = product.imageCover.split(`${req.protocol}://${req.get("host")}/`);
            const imageCoverName = partsCover[partsCover.length - 1];
            console.log(partsCover,imageCoverName);

            // Delete the old image cover
            fs.unlinkSync(imageCoverName, (err) => {
                if (err) {
                    console.error('Error deleting old image cover:', err);
                }
            });
            req.body.imageCover = req.files.imageCover[0].filename;
        }

        // Update images if provided
        if (req.files.images && req.files.images.length > 0) {
            // Delete old images
            product.images.forEach((img) => {
                const partsImage = img.split(`${req.protocol}://${req.get("host")}/`);
                const imageName = partsImage[partsImage.length - 1];
                fs.unlinkSync(imageName, (err) => {
                    if (err) {
                        console.error('Error deleting old image:', err);
                    }
                });
            });
            req.body.images = req.files.images.map((file) => file.filename);
        }
    }
        
          
    

    let newproduct = await Product.findByIdAndUpdate(req.params.id, req.body , {new:true})
    newproduct || next(new AppError('product not found',404))
    !newproduct || res.json({message:'success',newproduct})

}
)

const deleteProduct = catchError(async(req,res,next)=>{
    let product = await Product.findById(req.params.id)
    const partsCover = product.imageCover.split(`${req.protocol}://${req.get("host")}/`);
            const imageCoverName = partsCover[partsCover.length - 1];
            console.log(partsCover,imageCoverName);

            
            fs.unlinkSync(imageCoverName, (err) => {
                if (err) {
                    console.error('Error deleting old image cover:', err);
                }
            });
            product.images.forEach((img) => {
              const partsImage = img.split(`${req.protocol}://${req.get("host")}/`);
              const imageName = partsImage[partsImage.length - 1];
              fs.unlinkSync(imageName, (err) => {
                  if (err) {
                      console.error('Error deleting old image:', err);
                  }
              });
          });
     await Product.findByIdAndDelete(req.params.id)
    product || next(new AppError('product not found',404))
    !product || res.json({message:'success',product})
}
)


export{
    addProduct,
    allProducts,
    getProduct,
    updateProduct,
    deleteProduct

}