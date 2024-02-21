/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Dialog = ({ title, setDialogOpen, children }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setDialogOpen();
      }
    };

    // Attach the event listener
    document.addEventListener("keydown", handleEscape);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setDialogOpen]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
        <div
          className=" bg-slate-100 p-6 rounded-lg z-10 w-fit overflow-auto"
          style={{ minWidth: "420px", minHeight: "90vh", maxHeight: "90vh" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-600 text-xl">{title}</h3>
            <button
              onClick={() => {
                setDialogOpen(false);
              }}
              className="font-bold text-slate-600 text-xl"
            >
              <IoClose />
            </button>
          </div>

          <div className="text-black">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Dialog;