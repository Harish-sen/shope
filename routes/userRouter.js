const express=require('express')
const router=express.Router()
const user=require('../controller/usercontroller')

router.post('/register',user.userRegistration)

module.exports=router