import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloggedin, setisloggedin] = useState(!!localStorage.getItem("jwt"));
  const navigate = useNavigate();

  useEffect(() => {
    if (isloggedin) {
      navigate("/");
    }
  }, [isloggedin, navigate]);

  const handleclick = async () => {
    try {
      const res = await axios.post(
        "https://cautious-doodle-r44qq6rg955q3554r-3000.app.github.dev/app/v1/signin",
        {
          username: email,
          password: password,
        }
      );

      if (res) {
        toast.success("Logged in successfully!");
        localStorage.setItem("jwt", res.data.jwt); 
        setisloggedin(true);
        navigate("/"); 
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signin failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster />
      <div className="py-2 text-sm flex flex-col justify-center items-center w-80">
        <div className="text-center">
          <h1 className="font-bold text-4xl pt-6">Sign In</h1>
          <p className="text-slate-500 text-md pt-1 px-4 pb-4">
            Enter your information to access your account!
          </p>
        </div>
        <div className="w-full">
          <div className="text-sm font-medium text-left py-2">Email</div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-2 py-1 border rounded"
            type="email"
            name="email"
            placeholder="john@example.com"
          />
          <div className="text-sm font-medium text-left py-2">Password</div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-2 py-1 border rounded"
            type="password"
            name="password"
            placeholder="••••••••"
          />
        </div>
        <button
          onClick={handleclick}
          className="mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full cursor-pointer"
        >
          Sign In
        </button>
        <p className="mt-3">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
