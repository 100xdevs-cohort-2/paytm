import React, { useState } from 'react'
import Button from '../components/Button'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import BottomWarning from '../components/BottomWarning'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'


const Signup = () => {
    const [firstname,setFirstName]=useState("")
    const [lastname,setLastName]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate();
 

    const handelsignup = async () => {
       
        try {
           const resp= await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstname,
                lastname,
                password
            });
            if(resp){
              toast.success("User Created sucessfully")  
             navigate("/signin")
            }
        } catch (error) {
            if (error.response.status === 409) {
                console.error("Username or email is already in use.");
            } else {
                console.error("Error:", error);
            }
        }
    };

  return (
     <div className='bg-slate-300 h-screen flex justify-center'>
        <div className=' flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                <Heading label={"SignUp"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox  label={"First Name"} placeholder={"Ajit"} onChange={(e)=>{setFirstName(e.target.value)}} />
                <InputBox  label={"LastName"} placeholder={"Pradhan"} onChange={(e)=>{setLastName(e.target.value)}} />
                <InputBox  label={"Username"} placeholder={"ajit@gmail.com"} onChange={(e)=>{setUsername(e.target.value)}} />
                <InputBox  label={"password"} placeholder={""} onChange={(e)=>{setPassword(e.target.value)}} />
                <div className='pt-4'>
                    <Button name={"Sign Up"} onClick={()=>{handelsignup()}} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}  />
            </div>
        </div>
     </div>
  )
}

export default Signup