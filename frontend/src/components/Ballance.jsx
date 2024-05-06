import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Balance = () => {
  const [balance, setBalance] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    
    if (token) {
      fetchBalance();
    }
  }, [token]);

  return (
    <div className='text-black p-2'>
      {balance !== null ? (
        <div className='font-bold'>Your Balance: {balance}</div>
      ) : (
        <div>Loading balance...</div>
      )}
    </div>
  );
};

export default Balance;
