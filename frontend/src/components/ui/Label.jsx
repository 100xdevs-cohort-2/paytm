import React from "react";

function Label({ htmlFor = "", className = "", text = "Label" }) {
  return (
    <label htmlFor={htmlFor} className={`${className} block text-sm/6 font-medium text-gray-900`}>
      {text}
    </label>
  );
}

export default Label;
