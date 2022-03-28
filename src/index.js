const express=require("express")
const app=express()
const {register,login}=require("./controllers/auth.controller")
const todoController=require("./controllers/todo.controller")


app.use(express.json())

app.use("/todos",todoController)


app.post("/register",register)

app.post("/login",login)






module.exports=app