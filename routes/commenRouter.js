const express=require("express")
const shope=require('./shoperouter')
const user=require('./userRouter')
const commenRouter=express.Router()

commenRouter.use('/shope',shope)
commenRouter.use('/user',user)

module.exports=commenRouter