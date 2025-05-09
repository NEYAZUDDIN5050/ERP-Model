const jwt =require("jsonwebtoken")

const verifyToken=async(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    jwt.verify(token,"secret",(err)=>{
        if(err){
            res.json({
                code:403,
                message:"Authorization Failed",
                success:false,
                error:true
            })
        }else{
            next()
        }
    })
}

module.exports=verifyToken