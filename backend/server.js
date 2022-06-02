const express=require("express");

const connDB=require('../backend/config/db.js')
const userSchema=require('../backend/models/User.js')
const contactSchema=require('../backend/models/Contact.js')
const data=require("./data/example.json")
const dotenv=require('dotenv')
dotenv.config();
const cors=require('cors')
const bodyParser=require('body-parser')
connDB();
const app=express();

const port=process.env.PORT || 5000

// in order to use static files, we need to use a middleware .Thus use static
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// app.use(express.json()) this is not  required as bodyparser does the same.
app.use(express.static(__dirname+"/images"))

// we can use  next operations if required, but can send once only.Here res.send can be used only once.
app.get('/',(req,res,next)=>{
    res.send('API is running here... poda cherukka');
    next()
},(req,res)=>{
    console.log("Jitto here")
})

// inorder to use multiple routes we can use app.route method . This can significantly improve the speed.
// its called route chaining
// app.route("/items")
//     .get((req,res)=>{
//         // console.log(req.params.id)
//         // const id=Number(req.params.id)
//         console.log(`Hello there ${req.body}`)
//         res.json(data)
//     })
//     .post((req,res)=>{
//         res.send(req.body)
//     })
//     .delete((req,res)=>{
//         res.send(data[2])
//     })

// Creating the API
 app.route("/contact")
    .post((req,res)=>{
        const newContact=new contactSchema(req.body)
        newContact.save((err,contact)=>{
            if(err){
                res.send(err)
            }
            res.json(contact)
        })
    })
    .get((req,res)=>{
        contactSchema.find({},(err,contact)=>{
            if(err){
                res.send(err)
            }
            res.json(contact)
        })
    })
app.route("/contact/:contactId")
    .get((req,res)=>{
        contactSchema.findById(req.params.contactId,(err,contact)=>{
            if(err){
                res.send(err)
            }
            res.json(contact)
        })
    })
// End of API

// now this make sure that we use error handling method.This should be written after everything. 
app.use((err,req,res,next)=>{

})


app.listen(port,console.log(`hii there the server in ${process.env.NODE_ENV} mode  in port ${port}`));