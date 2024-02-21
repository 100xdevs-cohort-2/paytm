import React from 'react'

const InputComponent = ({type,placeholder,onchange,value}) => {
  return (
    <div>
        <input
          type={type}
          placeholder={placeholder}
          onChange={onchange}
          value={value}
          className="w-full h-10 text-lg px-4 py-3 font-medium border-2 border-gray-200 focus:outline-none"
        />
    </div>
  )
}

export default InputComponent