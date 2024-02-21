/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Transfer } from "./Transfer";

const ButtonComponent = ({ title,handleUser=null }) => {
  return (
    <div className="text-white bg-black font-bold text-2xl text-center p-2 rounded-sm w-full">
      <button type="submit" onClick={handleUser} className="w-full">
        {title}
      </button>
    </div>
  );
};

export default ButtonComponent;
