const express=require('express')
const router=express.Router()
const user=require('../controller/usercontroller')

router.post('/register',user.userRegistration)
router.post('/login',user.userLogin)

module.exports=router