import mongoose from "mongoose";



export const dbconnection =async()=>{
   await  mongoose.connect(process.env.MONGODB_COMPASS).then(()=>{
        console.log("DataBase Connected")
    }).catch((err)=>{
        console.log("DataBase error" , err)
    })
}