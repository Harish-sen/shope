const mongoose=require('mongoose')

const  bookshopeSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    shopeId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

module.exports=mongoose.model("bookshope",bookshopeSchema)