const shope=require('../shopModule/shopeSchema')
const bycrpt=require('bcrypt')

const addshope = async(req,res)=>{
    const {email,password}=req.body
    try {
        const shopeExists = await shope.findOne({email:email})
        if(shopeExists){
            return res.status(409).json({
                success:"failure",
                message:"shope already exists"
            })
        }
        else{
            const shopeData = await new shope(req.body)
            const salt=await bycrpt.genSalt(10)
            shopeData.password=await bycrpt.hash(password,salt)
            const filepath = `/public/upload/${req.file.filename}`;
            shopeData.image = filepath

            const shopeInfo=await shopeData.save()
            return res.status(201).json({
                success:"success",
                message:"shope added",
                shopeinformation:shopeInfo
            })
        }
    } catch (err) {
        res.status(500).json({
            success:"failure",
            message:err.message,
        })
    }
}

const shopeLogin=async(req,res)=>{
    const {email,password}=req.body
    try {
        const shopeData=await shope.findOne({email:email})
        if(shopeData!=null){
         const isMatch=await bycrpt.compare(password,shopeData.password)
         if(shopeData.email===email&&isMatch){
            return res.status(201).json({
                success:"success",
                message:"login success",
                shopesData:shopeData
            })
         }else{
            return res.status(403).json({
                success:"failure",
                message:"email or password not match"
            })
         }
        }else{
            return res.status(403).json({
                success:"failure",
                message:"shope is not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:"failure",
            message:error.message
        })
    }

}

const shopeList=async(req,res)=>{
    try {
        const shopeData=await shope.find()
        const  shopeCount=await  shopeData.length
        return res.status(201).json({
            success:"success",
            message:"all shope List",
            Count:shopeCount,
            List:shopeData
        })
    } catch (error) {
        return res.status(500).json({
            success:"success",
            message:error.message,
        })
    }
}

const shopeDetails=async(req,res)=>{
    const shopeId=req.params.id
    try {
        const shopeDtail=await shope.findById(shopeId)
        if(shopeDtail){
            return res.status(201).json({
                success:"success",
                message:"shope details found",
                shopeData:shopeDtail
            })
        }else{
            return res.status(403).json({
                success:"failure",
                message:"shope not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success:"failure",
            message:error.message
        })
    }
}

const filterByCity=async(req,res)=>{
    const city=req.query.city
    const shopeName=req.query.shopeName
    try {
        const query = {
            city: { $regex: city, $options: "i" },
            shopeName: { $regex: shopeName, $options: "i" }, 
          };
        const searchdata=await shope.find(query)
        const count=await searchdata.length
        if(searchdata){
            return res.status(201).json({
                success:"success",
                message:"here is all search data",
                count:count,
                searchData:searchdata
            })
        } 
        
    } catch (error) {
        res.status(500).json({
            success:"failure",
            message:error.message,
        })
    }

}

module.exports={
    addshope,
    shopeLogin,
    shopeList,
    shopeDetails,
    filterByCity
}