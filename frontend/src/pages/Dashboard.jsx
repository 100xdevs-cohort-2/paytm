import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const [user, setuser] = useState([]);
  const [query, setquery] = useState("");
  const loggedin = !!localStorage.getItem("jwt");
  const [amount,setamount] = useState("")
  const [name,setname] = useState('')
  const [id, setid] = useState('');

  const navigate = useNavigate();

  useEffect(() => {

if(!loggedin){
  navigate("/signin")
}else{


    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `https://cautious-doodle-r44qq6rg955q3554r-3000.app.github.dev/app/v1/alluser?filter=${query}`
        );
        const res2 = await axios.get("https://cautious-doodle-r44qq6rg955q3554r-3000.app.github.dev/app/v1/account/balance",{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        const res3 = await axios.get("https://cautious-doodle-r44qq6rg955q3554r-3000.app.github.dev/app/v1/signup/getuser",{
          headers:{
            Authorization:"Bearer " + localStorage.getItem("jwt")
          }
        })
        setuser(res.data.user);
        setamount(res2.data.balance.toFixed(2));
        setname(res3.data.firstname)
        setid(res3.data._id)
      } catch (err) {

      }
    };

    fetchUsers();
  }
  }, [query]);

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-800 font-sans">
      {loggedin ? (
        <>
          <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-violet-600">Payments App</h1>
            <span className="text-sm text-gray-600">Hello, <b>{name}</b></span>
          </header>

          <main className="px-6 mt-10 max-w-2xl mx-auto">
            <section className="mb-6">
              <p className="text-xl font-semibold">Your Balance</p>
              <p className="text-2xl font-bold text-green-600 mt-1">${amount}</p>
            </section>

            <section className='pb-5'>
              <p className="text-lg font-semibold mb-3">Search Users</p>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
                type="text"
                placeholder="Search by name"
                onChange={(e) => setquery(e.target.value)}
              />

              <div className="mt-6 space-y-4">
                {user.length > 0 ? (
                  user.filter((u)=>u._id!==id).map((u, index) => (
                    <div key={index} className="flex justify-between items-center bg-white px-4 py-3 shadow-sm rounded-md border">
                      <div>
                        <p className="text-base font-medium">{u.firstname} {u.lastname}</p>
                      </div>
                      <button
                        onClick={() => navigate(`/send?id=${u._id}&name=${u.firstname}`)}
                        className="bg-violet-600  hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-md transition cursor-pointer"
                      >
                        Send Money
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No users found.</p>
                )}
              </div>
            </section>
          </main>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg font-medium text-gray-600">Please sir log in first</p>
          
        </div>
      )}
    </div>
  );
};
