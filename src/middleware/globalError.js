



export const globalError = (err,req,res,next)=>{
    let code = err.statusCode ||500
    if(process.env.MODE=='development'){
        res.status(code).json({error:"error",code,message:err.message,stack:err.stack})
    }else{
        res.status(code).json({error:"error",code,message:err.message })
    }
}