const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config();

const connDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to ${conn.connection.host}`)
    }catch(err){
        console.error("Error")
    }
}

module.exports=connDB;