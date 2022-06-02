import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function UserDetails() {
  const [details,setDetails]=useState({
    name:"",
    email:"",
    phone:"",
  })

  const {name,email,phone}=details
  const onSubmit=async(e)=>{
    e.preventDefault()
    const data={
        name:name,
        email:email,
        phone:phone
    }
    const config={
        headers:{
            "Content-Type":"application/json",
            authorization:'Access-Control-Allow-Origin'
        }
    }
    try{
        await axios.post("/contact",data,config).then((res)=>{
            setDetails(res.data)
        })
        setDetails({
          name:"",
          email:"",
          phone:"",
        })
        window.location.reload()
    }catch(err){
        console.error(err)
    }
  }
  const onChange=(e)=>{
    setDetails({...details,[e.target.name]:e.target.value})
    //   console.log(details)
  }
  const [data,setData]=useState([])

  const serveData=async()=>{
    const config={
      headers:{
          "Content-Type":"application/json",
          authorization:'Access-Control-Allow-Origin'
      }
    }
    try{
      await axios.get("/contact",config).then((res)=>{
          setData(res.data)
          console.log(res.data)
      })
    }catch(err){
      console.error(err)
    }
  }
  useEffect(()=>{
    serveData()
  },[])

  const [id,setId]=useState('')
  const [open,setOpen]=useState(false)
  const [clickContact,setClickContact]=useState({})

  const handleClose = () => {
    setOpen(false);
  };
  const showContact=async(id)=>{
    const config={
      headers:{
        "Content-Type":"application/json"
      }
    }
    try{
      const result=await axios.get(`/contact/${id}`,config)
      setClickContact(result.data)
    }catch(err){
      console.error(err)
    }
  }

  const {clickName,clickEmail,clickPhone}=clickContact

  const clickChange=(e)=>{
    setClickContact({...clickContact,[e.target.name]:e.target.value})
  }

  // useEffect(()=>{
  //   showContact(id)
  // },[id])

  return (
    <>
    <div className='form'>
      <form onSubmit={(e)=>onSubmit(e)} className='original-form'>
          <input className='input'  type="text" placeholder='enter the name' required onChange={(e)=>onChange(e)} value={name} name="name"></input>
          <br/>
          <input className='input' type="email" placeholder='enter the email' required onChange={(e)=>onChange(e)} value={email} name="email"></input>
          <br/>
          <input className='input' type="tel" placeholder='enter the phone' required onChange={(e)=>onChange(e)} value={phone} name="phone"></input>
          <br/>
          <button type='submit' className='button'>Enter this Contact</button>
      </form>
    </div>

    <div>
      <h1>Contact list</h1>
      <Dialog></Dialog>
      <div className='main'>
      {
        data.length>0 ?
          (data.map((user,id)=>{
            return (
            <div key={id} className='user-data'>
              <div>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.createdDate}</p>
              </div>
            </div>)
          }))
          :(<p>No Data Found</p>)
      }
      </div>
    </div>
    </>
  )
}
