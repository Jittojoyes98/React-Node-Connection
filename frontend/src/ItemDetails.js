import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function ItemDetails() {

  const [items,setItems]=useState([])

  const getItems=()=>{
    // console.log("HII")
      const config={
          headers:{
              "Content-Type":'application/json',
              authorization:'Access-Control-Allow-Origin'
          }
      }
      try{
        axios.get('/contact',config).then((res)=>{
          // res=res.json()
          console.log(res)
          // note that when we  res.data because we send from the backend via res.json 
          setItems(res.data)
        })
      }catch(err){
        console.log(err)
      }
  }

  useEffect(()=>{
    getItems()
  },[])

  return (
    <div>
      <h1>Hii</h1>
      { items.length>0 ? 
        items.map((item)=>
          <li key={item.name}>{item.name}</li>
        )
        : <p>Nothing here</p>
      }
    </div>
  )
}

// finally we got the data that we wanted.
