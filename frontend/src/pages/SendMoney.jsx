import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { redirect, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export const SendMoney = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [amount, setamount] = useState('');
  const isloggedin  = !!localStorage.getItem("jwt") 
  const [loading,setloading] = useState(false)
  const location = useLocation();

  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const nameParam = params.get('name');
    const idParam = params.get('id');

    if (nameParam) setName(nameParam);
    if (idParam) setId(idParam);
  }, [location.search]);
  const handleclick = async () => {
setloading(true)

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
  
    try {
      const response = await axios.post(
        "https://cautious-doodle-r44qq6rg955q3554r-3000.app.github.dev/app/v1/account/transfer",
        { amount: amount, to: id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
  
      if (response.status === 200 && !loading) {
        setloading(false)
        toast.success("Transaction completed!");
        toast('Redirecting to homepage...',
          {
            icon: '👏',
            duration:3000,
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
        
  
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(response.data.message || "Transaction failed!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Transaction failed!");
    }
  };
  
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <Toaster/>   
        <div className="bg-white shadow-lg rounded-xl p-6 w-80">
        <div className="text-center">
          <h1 className="font-bold text-3xl mb-1">Send Money</h1>
          <p className="text-gray-600 text-sm mb-4">
            Enter your information to send money!
          </p>
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Send to <span className="font-semibold">{name}</span>
          </label>
          <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">
            Enter amount:
          </label>
          <input
            type="number"
            onChange={(e) => setamount(e.target.value)}
            value={amount}
            placeholder="e.g. 100"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>
        <button
        onClick={handleclick}
          className="mt-5 bg-violet-600 cursor-pointer hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-md w-full transition-all"
        >
          Send
        </button>
        <button
                onClick={() => navigate("/")}
                className="justify-center cursor-pointer rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full mt-3 bg-red-500 text-white"
              >
                Cancel & Go Back
              </button>
      </div>
    </div>
  );
};
