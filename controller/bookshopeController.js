const shope=require('../shopModule/shopeSchema')
const user=require('../shopModule/userSchema')
const bookshope=require('../shopModule/bookshopeSchema')

const bookShope=async(req,res)=>{
    try {
        const userID=req.params.userId
        const shopeID=req.params.shopeId
        const shopeData=await shope.findById(shopeID)
        if(userID&&shopeData){
            const info = await new bookshope(req.body);
            info.userId=req.params.userId
            info.shopeId=req.params.shopeId
            const book=await info.save()
            return res.status(200).json({
                success:"success",
                message:"slot booked",
                bookingData:book
            })
            
        }else{
            res.status(403).json({
                success:"failure",
                message:"id problem",
              
            })
        }
    } catch (error) {
        res.status(500).json({
            success:"failure",
            message:error.message,
            
        })
    }
}

const bookshopeList=async(req,res)=>{
    try {
        let allbooklist=await bookshope.find()
        let count=await allbooklist.length
        if(allbooklist){
            return res.status(201).json({
                success:"success",
                message:"all data found",
                Count:count,
                bookindList:allbooklist,
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:"failure",
            message:error.mesaage,
        })
        
    }
}

const updateSlotBook=async(req,res)=>{
    const shopeId = req.params.shopeId
    const slotBookId = req.params.id
    try {
        const updateData = await bookshope.findByIdAndUpdate(slotBookId, req.body, {
            new: true,
            runValidators: true,
          })
          if (updateData.shopeId == shopeId) {
            const shope = await bookshope.findOne({ shopeId: shopeId })
            const result = await updateData.save()
            res.status(200).json({
              success: "success",
              message: "Slot update successfully",
              data: result
            })
          } else {
            res.status(400).json({
              success: "failure",
              error: "not valid slot",
            })
          }

   } catch (error) {
    return res.status(500).json({
        success:"success",
        message:error.message,
         
    })
   }
}

const UsershopeBookings=async(req,res)=>{
    const userId=req.params.userId
    try {
        if(userId){
            const userBookings=await bookshope.find({ userId: userId }).sort({ "createdAt": -1 })
            return res.status(201).json({
                success:"success",
                message:"all user bookings",
                List:userBookings
            })
        }
    } catch (error) {
        res.status(201).json({
            success:"failure",
            message:error.message,
        })
    }
}


module.exports={
    bookShope,
    bookshopeList,
    updateSlotBook,
    UsershopeBookings
}