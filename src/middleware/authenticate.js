require('dotenv').config()
var jwt = require('jsonwebtoken')
const verifyToken=(token)=>{
    return jwt.verify(token, process.env.SECRETE_KEY)
}

const authenticate=async(req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(400).send({message:"token not found"})
    }
    if(!req.headers.authorization.startsWith("Bearer")){
        return res.status(400).send({message:"token not found"})
    }
    const token=req.headers.authorization.trim().split(" ")[1]
     let decoded
    try{
         decoded=verifyToken(token)
         if(decoded){
           console.log(decoded)
           req.user=decoded.user._id
            return next()
         }
     }
     catch(err){
       return res.send(err)
     }



}
module.exports=authenticate