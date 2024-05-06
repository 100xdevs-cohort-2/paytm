import React from 'react'

const Button = ({name,onClick}) => {
  return (
    <button className=' bg-[#2F3437] px-2 py-2 w-full rounded-md' onClick={onClick}>{name}</button>
  )
}

export default Button