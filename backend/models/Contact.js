const mongoose=require('mongoose')

const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true
    },
    createdDate:{
        type:Date,
        default:Date.now
    }
})

module.exports=contact=mongoose.model("Contact",contactSchema)