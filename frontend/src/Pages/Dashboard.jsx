/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import UserComponent from "../Components/UserComponent";
import InputComponent from "../Components/InputComponent";
import { Navigate, useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Transfer } from "../Components/Transfer";

let initialState = {
  firstname: "Yogesh",
  lastname: "Chauahn",
  id: 1,
};
const Dashboard = () => {
  const { Logout, isAuth } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [userData, setUserData] = useState(initialState);
  const [balance, setBalance] = useState("");
  const [filter,setFilter] = useState("")

  const handleSearch = (e)=>{
    setFilter(e.target.value)  }
  // const [transfer,setTransfer] = useState(false)
  const value = useParams();

  const fetchUser = async () => {
    const response = await axios.get(`http://localhost:3000/api/v1/user/`, {
      headers: {
        Authorization: "Bearer" + " " + localStorage.getItem("token"),
      },
    });
    setUserData(response.data.result);

    const res = await axios.get(`http://localhost:3000/api/v1/user/all?filter=${filter}`, {
      headers: {
        Authorization: "Bearer" + " " + localStorage.getItem("token"),
      },
    });
    // console.log(res.data.users);
    setAllUsers(res.data.users);

    const balanceResult = await axios.get(
      `http://localhost:3000/api/v1/account/balance`,
      {
        headers: {
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
      }
    );
    // console.log(balanceResult.data.balance);
    setBalance(balanceResult.data.balance);
  };

  useEffect(() => {
    fetchUser();
  }, [filter]);
  
  if (!isAuth) {
    return <Navigate to="/signin" />;
  }
  return (
    <div className="w-4/5 mx-auto mt-20 flex flex-col gap-5">
      <div className="flex justify-between items-center border-2 border-gray-200 p-3">
        <div className="font-semibold">
          <h2>Payments App</h2>
        </div>
        <div>
          <button onClick={Logout}>Sign Out</button>
        </div>
        <div className="flex justify-center font-medium items-center gap-3">
          <p>Hello, {` ${userData.firstname} ${userData.lastname}`}</p>
          <div className="rounded-full w-10 h-10 flex justify-center items-center bg-[#f2f2f2] text-black">
            <h2>{userData ? userData.firstname[0] : " "}</h2>
          </div>
        </div>
      </div>
      <div className="font-bold">
        <h1>Your Balance :- {balance + " Rs"}</h1>
      </div>
      <div className="font-semibold">
        <h3>Users</h3>
      </div>
      <div>
        <InputComponent type="search" placeholder={"Search users...."} onchange={handleSearch} value={filter}/>
      </div>
      <div className="flex flex-col gap-5">
        {allUsers.map((item) => (
          <UserComponent key={item.id} user={item} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
