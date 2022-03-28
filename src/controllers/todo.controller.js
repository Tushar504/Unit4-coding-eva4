const express=require("express")
const Todo=require("../models/todo.model")
const authenticate=require("../middleware/authenticate")
const router=express.Router()

router.get("",authenticate,async(req,res)=>{
    try {
       if(req.user==req.body.user){
           const todo=await Todo.find({user_id:req.user})
           return res.status(200).send(todo)
        }
        return res.send({message:"login first"})
    } 
    catch (error) {
        return res.send(error)
    }
})

router.post("",authenticate,async(req,res)=>{
    try {
        const todo=await Todo.create(req.body)
        return res.status(200).send(todo)

    } 
    catch (error) {
        return res.send(error)
    }
})

router.get("/:id",authenticate,async(req,res)=>{
    try {
        
        const todo=await Todo.findById(req.params.id)
        if(todo.user_id==req.user){
            return res.send(todo)
        }
        return res.status(401).send({message:"login first"})
        
      

    } 
    catch (error) {
        return res.send(error)
    }
})

router.patch("/:id",authenticate,async(req,res)=>{
    try {
        let todo=await Todo.findById(req.params.id)
        
        if(todo.user_id==req.user){
             todo=await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true})
            return res.send(todo)
        }
        return res.status(401).send({message:"login first"})
        
      

    } 
    catch (error) {
        return res.send(error)
    }
})

router.delete("/:id",authenticate,async(req,res)=>{
    try {
        let todo=await Todo.findById(req.params.id)
        
        if(todo.user_id==req.user){
             todo=await Todo.findByIdAndDelete(req.params.id)
            return res.send(todo)
        }
        return res.status(401).send({message:"login first"})
        
      

    } 
    catch (error) {
        return res.send(error)
    }
})

module.exports=router