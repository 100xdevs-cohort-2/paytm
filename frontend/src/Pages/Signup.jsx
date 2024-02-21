/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";

import ButtonComponent from "../Components/ButtonComponent";
import Heading from "../Components/Heading";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../Context/AuthContext";

let initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
const Signup = () => {
  const [details, setDetails] = useState(initialState);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const { isAuth, Login, Logout } = useContext(AuthContext);
  const { firstName, lastName, email, password } = details;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(details);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        details
      );
      console.log("response after post :- ", data);
      setUserId(data.userId);
      setDetails(initialState);
      Login(data.token);
    } catch (error) {
      console.log("an error occured :-",error.response.data.message);
    }
  };

  const handleChange = (e) => {
    let inputValue = e.target.value;
    setDetails({ ...details, [e.target.name]: inputValue });
  };

  // console.log(details);

  if (isAuth) {
    return <Navigate to={`/dashboard/${userId}`} />;
  }

  return (
    <div className="w-full m-auto shadow-2xl rounded-lg sm:w-1/3 p-3 h-4/5">
      <div className="">
        <Heading title="Sign Up" />
      </div>
      <div className="text-xl font-normal w-4/5 text-center mt-1 mx-auto">
        <p>Enter your information to create an account </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <label htmlFor="" className="font-medium text-xl  mt-2">
          First Name
          <br />
          <input
            type="text"
            placeholder="Enter First Name"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            className="w-full h-10 text-lg my-3 rounded-md px-4 py-3 font-medium border-2 border-gray-200 focus:outline-none"
          />{" "}
          <br />
        </label>
        <label htmlFor="" className="font-medium text-xl  mt-2">
          Last Name
          <br />
          <input
            type="text"
            placeholder="Enter Last Name"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            className="w-full h-10 my-3 text-lg rounded-md px-4 py-3 font-medium border-2 border-gray-200 focus:outline-none"
          />{" "}
          <br />
        </label>
        <label htmlFor="" className="font-medium text-xl  mt-2">
          Email
          <br />
          <input
            type="email"
            onChange={handleChange}
            name="email"
            placeholder="Enter Email"
            value={email}
            className="w-full h-10 my-3 text-lg rounded-md px-4 py-3 font-medium border-2 border-gray-200 focus:outline-none"
          />
        </label>{" "}
        <br />
        <label htmlFor="" className="font-medium text-xl  mt-2">
          Password
          <br />
          <input
            onChange={handleChange}
            type="text"
            name="password"
            placeholder="Enter Password"
            value={password}
            className="w-full h-10 text-lg my-3 rounded-md px-4 py-3 font-medium border-2 border-gray-200 focus:outline-none"
          />
        </label>
        <br />
        <br />
        <div className="m-auto">
          <ButtonComponent title="Sign Up" />
        </div>
      </form>

      <p className="my-3">
        Already have an account? <Link to={"/signin"}>Login</Link>
      </p>
    </div>
  );
};

export default Signup;
