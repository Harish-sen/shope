const express=require('express')
const router=express.Router()
const bookshope=require('../controller/bookshopeController')

router.post('/bookslot/:userId/:shopeId',bookshope.bookShope)
router.patch('/bookslot/:shopeId/:id',bookshope.updateSlotBook)
router.get('/bookslotlist',bookshope.bookshopeList)
router.get('/userBookingList/:userId',bookshope.UsershopeBookings)

module.exports =router