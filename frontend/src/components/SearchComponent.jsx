import React, { useEffect, useState } from 'react'
import InputBox from './InputBox'
import axios from 'axios'
const SearchComponent = () => {
  const[users,setusers]=useState("")
  const[filter,setFilter]=useState("")

  useEffect(async()=>{
      const response= await axios.get("http://localhost:3000/api/v1/user/search/fliter")
      setusers(response.data.user);
      console.log(users);
  },[filter])
  return (
    <div className='p-2'>
      <p className='font-bold'>Users</p>
    <InputBox placeholder={"Search users..."} />
    <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
          
        </div>
    </div>
  )
}

const User=({user})=>{
  return(
    <div></div>
  )
}
export default SearchComponent

