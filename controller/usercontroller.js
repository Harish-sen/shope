const User=require('../shopModule/userSchema')
const bycrpt=require('bcrypt')

const userRegistration=async(req,res)=>{
    const{userEmail,userPassword}=req.body
    try {
        const userExists=await User.findOne({userEmail:userEmail})
        if(userExists){
            return res.status(403).json({
                success:"failure",
                message:"user already Exists"
            })
        }else{
            const userData=await new User(req.body)
            const salt=await bycrpt.genSalt(10)
            userData.userPassword= await bycrpt.hash(userPassword,salt)
            const userIfo=await userData.save()
            return res.status(201).json({
                success:"success",
                message:"Registration successfully",
                userdata:userIfo
            })


        }
    } catch (error) {
        return res.status(500).json({
            success:"failure",
            message:error.message
        })
    }
}

const userLogin=async(req,res)=>{
    const {userEmail,userPassword}=req.body
    try {
        const userdata=await User.findOne({userEmail:userEmail})
        if(userdata!=null){
        const isMatch=await bycrpt.compare(userPassword,userdata.userPassword)
        if(userdata.userEmail=== userEmail&&isMatch){
            return res.status(201).json({
                success:"success",
                message:"login successfully",
                userData:userdata
            })
        }else{
            return res.status(403).json({
                success:"failure",
                message:"Email password is not match"
            })
        }
        }else{
            return res.status(403).json({
                success:"success",
                message:"User not found"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:"failure",
            message:error.message
        })
    }
}



module.exports={
    userRegistration,
    userLogin
}