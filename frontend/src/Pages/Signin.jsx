/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Heading from "../Components/Heading";
import ButtonComponent from "../Components/ButtonComponent";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

let initialState = {
  email: "",
  password: "",
};
const Signin = () => {
  const [details, setDetails] = useState(initialState);
  const [userId, setUserId] = useState("");
  const { Login, isAuth } = useContext(AuthContext);
  const { email, password } = details;
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(details);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        details
      );
      // console.log("response after post :- ", data);
      setDetails(initialState);
      Login(data.token);
      setUserId(data.id);
    } catch (error) {
      console.log("an error occured :-", error.response.data.msg);
    }
  };

  const handleChange = (e) => {
    let inputValue = e.target.value;
    setDetails({ ...details, [e.target.name]: inputValue });
  };

  if (isAuth) {
    return <Navigate to={`/dashboard`} />;
  }
  return (
    <div className="m-auto w-fit flex flex-col gap-3 shadow-2xl  p-3 rounded-md ">
      <div className="text-center">
        <Heading title="Sign In" />
      </div>
      <div className="text-xl font-normal w-4/5 text-center m-auto">
        <p>Enter your credentials to acess your account </p>
      </div>

      <form onSubmit={handleSubmit} className="">
        <label htmlFor="" className="font-medium text-2xl 2 mt-2">
          Email
          <br />
          <input
            type="email"
            onChange={handleChange}
            name="email"
            placeholder="Enter Email"
            value={email}
            className="w-full h-10 text-lg rounded-md my-3 px-4 py-3 font-medium border-2 border-gray-200 focus:outline-none"
          />
        </label>{" "}
        <br />
        <label htmlFor="" className="font-medium text-2xl 2  ">
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
          <ButtonComponent title="Sign In" />
        </div>
      </form>

      <p>
        Don't have an account? <Link to={"/signup"}>Sign Up</Link>
      </p>
    </div>
  );
};

export default Signin;
