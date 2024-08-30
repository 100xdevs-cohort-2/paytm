import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Sign-up failed. Please try again.";
      setErrorMessage(message);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign in" />

          <SubHeading label="Enter your credentials to access your account" />

          <InputBox name={"username"} type={"email"} onChange={handleChange} placeholder="john@gmail.com" label="Email" />
          <InputBox name={"password"} placeholder="ilovepriya26" onChange={handleChange} label="password" />

          <div className="pt-4">
            <Button onClick={handleSignIn} label="Sign in" />
          </div>

          {errorMessage && (
            <div className="bg-red-500 flex items-center justify-center p-2 rounded-lg">
              <span>{errorMessage}</span>
            </div>
          )}

          <BottomWarning
            label="Don't have an account?"
            buttonText="Sign up"
            to="/signup"
          />
        </div>
      </div>
    </div>
  );
};
