import React from 'react';

const InputBox = ({ label, placeholder, onChange }) => {
  return (
    <div className="text-sm font-medium text-left py-2 text-black">
      <label>{label}</label>
      <input
        placeholder={placeholder}
        onChange={onChange}
        className='block w-full border rounded-md p-1 bg-transparent'
      />
    </div>
  );
};

export default InputBox;
