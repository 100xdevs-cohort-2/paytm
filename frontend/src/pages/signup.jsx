import React, { useEffect, useState } from "react";
import { data, Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const[isloggedin,setisloggedin] = useState(!!localStorage.getItem("jwt"))
useEffect(()=>{
if(isloggedin){
  navigate("/")
}
},[isloggedin])
  let navigate = useNavigate()
  const handleClick = async () => {
    try {
      const response = await axios.post(
        "https://cautious-doodle-r44qq6rg955q3554r-3000.app.github.dev/app/v1/signup",
        {
          firstname: firstName,
          lastname: lastName,
          username: email,
          password: password,
        }
      );

      if (response.status === 201) {
        toast.success("User Created Successfully!");
      }
      if(response.data.jwt){
        localStorage.setItem("jwt",response.data.jwt)
        setisloggedin(true)
         navigate("/")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster />
      <div className="py-2 text-sm flex flex-col justify-center items-center w-80">
        <div className="text-center">
          <h1 className="font-bold text-4xl pt-6">Sign Up</h1>
          <p className="text-slate-500 text-md pt-1 px-4 pb-4">
            Enter your information to create an account!
          </p>
        </div>
        <div className="w-full">
          <div className="text-sm font-medium text-left py-2">First Name</div>
          <input
            className="w-full px-2 py-1 border rounded"
            type="text"
            placeholder="John"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <div className="text-sm font-medium text-left py-2">Last Name</div>
          <input
            className="w-full px-2 py-1 border rounded"
            type="text"
            placeholder="Doe"
            onChange={(e) => setLastName(e.target.value)}
          />
          <div className="text-sm font-medium text-left py-2">Email</div>
          <input
            className="w-full px-2 py-1 border rounded"
            type="email"
            placeholder="john@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="text-sm font-medium text-left py-2">Password</div>
          <input
            className="w-full px-2 py-1 border rounded"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleClick}
          className="mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full cursor-pointer"
        >
          Sign Up
        </button>
        <p className="mt-3">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
