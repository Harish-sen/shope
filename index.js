const express=require('express')
const app=express()
const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
require('./middleware/config')

const routes=require('./routes/commenRouter')


app.use('/public/upload',express.static('public/upload'))

app.use('/',routes)

app.listen(5000,()=>{
    console.log("server is run on 5000")
})