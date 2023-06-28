const express=require('express')
const router=express.Router()
const addshope=require('../controller/ShopeController')
const {upload}=require('../middleware/multer')

router.post('/add', upload.single('image'),addshope.addshope)
router.post('/login',addshope.shopeLogin)
router.get('/list',addshope.shopeList)
router.get('/filterbycity',addshope.filterByCity)
router.get('/details/:id',addshope.shopeDetails)

module.exports=router