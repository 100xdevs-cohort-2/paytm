import React from "react";

function Input({
  value = "",
  onChange = () => {},
  id = "id",
  type = "text",
  name = "name",
  required = false,
  autoComplete = "off",
  className = "",
  placeholder = "Enter Text",
}) {
  return (
    <>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${className}`}
      />
    </>
  );
}

export default Input;
