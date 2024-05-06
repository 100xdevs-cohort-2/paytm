import React, { useState } from 'react'
import axios from 'axios'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { usernameAtom } from '../store/atom/Username'

const Signin = () => {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("")
    const navigate=useNavigate();
    const handelsignin= async()=>{
        try {
     const response= await axios.post("http://localhost:3000/api/v1/user/signin",{
        username,
        password
     })
     if(response){
    localStorage.setItem("token",response.data.token)
    localStorage.setItem("name",response.data.username)
    toast.success(`welcome back ${response.data.username}`)
     navigate("/dashboard")
     }
    } catch (error) {
           console.log(error) 
           toast.error("please provid valid credintial")

    }
    }
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
        <div className=' flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                <Heading label={"SignIn"} />
                <SubHeading label={"Enter your information to c Signin"} />
                <InputBox  label={"Username"} placeholder={"ajit@gmail.com"} onChange={(e)=>{setUsername(e.target.value)}} />
                <InputBox  label={"password"} placeholder={""} onChange={(e)=>{setPassword(e.target.value)}} />
                <div className='pt-4'>
                    <Button name={"Signin"} onClick={()=>{handelsignin()}} />
                </div>
                <BottomWarning label={"Don't have account?"} buttonText={"Sign up"} to={"/signup"}  />
            </div>
        </div>
     </div>
  )
}

export default Signin