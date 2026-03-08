const yup=require("yup")
const AsyncHandler=require("express-async-handler")

const userSchema=yup.object({
    name:yup.string().required().min(3,"Minimum 3 char allows").max(18,"maximum 18 char allows"),
    email:yup.string().email().required(),
    password:yup.string.positive().required().min(6,"minimum 6 char allows").max(18,"maximum 18 char allows")
})
const validates=AsyncHandler(async(req,res,next)=>{
try{
await userSchema.validate(req.body,{abortEarly:false})
next()
}catch(error){
    res.json({
        message:error.errors[0],
        code:404,
        success:false,
        error:true,
    })
}
})