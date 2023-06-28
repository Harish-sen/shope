const mongoos=require('mongoose')

const addShope=mongoos.Schema({
    shopeName:{
        type:String,
        required:true
    },  email:{
        type:String,
        required:true
    },  password:{
        type:String,
        required:true
    },  address:{
        type:String,
        required:true
    },  city:{
        type:String,
        required:true
    },  mobile:{
        type:String,
        required:true
    },  image:{
        type:String,
        required:true
    },    shopeKeeper:{
        type:String,
      default: "shopeKeeper",
         
    }
})

module.exports=mongoos.model("shopeKeeper",addShope)