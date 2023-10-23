const {z} =require('zod') 

const studentSchema= z.object({
    name:z.string().min(1), //non empty string 
    age:z.number().int().min(1).max(30),
    grade:z.number().int().min(1).max(12)
})


const validateMiddleware=(req,res,next)=>{
    try{
    // validate the request body by checking against our student schema
    const validateData= studentSchema.parse(req.body)
    next();
       }
catch(error){
     console.error('Invalid data ',error);
}

}

module.exports=validateMiddleware