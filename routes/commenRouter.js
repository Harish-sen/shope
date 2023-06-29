const express=require("express")
const shope=require('./shoperouter')
const user=require('./userRouter')
const book=require('./shopeBookRouter')
const commenRouter=express.Router()

commenRouter.use('/shope',shope)
commenRouter.use('/user',user)
commenRouter.use('/booking',book)

module.exports=commenRouter