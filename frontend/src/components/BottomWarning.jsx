import React from 'react'
import { useNavigate } from 'react-router-dom'

const BottomWarning = ({label,buttonText,to}) => {
    const navigate = useNavigate();
    const handelclick=()=>{
        navigate(to)
    }
  return (
    <div className=' text-black flex justify-center pt-2'>
        <p>{label}</p>
        <button className='underline font-bold cursor-pointer' onClick={handelclick}>{buttonText}</button>
    </div>
  )
}

export default BottomWarning