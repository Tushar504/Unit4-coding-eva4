const User=require("../models/user.model")
var jwt = require('jsonwebtoken')
require('dotenv').config()


const generatetoken=(user)=>{
    return  jwt.sign({user}, process.env.SECRETE_KEY)
}




const register=async(req,res)=>{
    try {
        let user=await User.findOne({email:req.body.email})
        if(user){
            return res.send({message:"user already registered"})
        }
         user=await User.create(req.body)
        return res.send(user)
    } 
    catch (error) {
        return res.send(error)
    }
}

const login=async(req,res)=>{
    try {
        let user=await User.findOne({email:req.body.email});
        if(!user){
            return res.send({message:"user not registered"})
        }
        const match=user.checkpassword(req.body.password)
        const token=generatetoken(user)
        if(match){
           return res.status(200).send({user,token})
        }

        return res.send({message:"password is wrong"})
    } 
    catch (error) {
        return res.status(400).send(error)
    }
}

module.exports={register,login}