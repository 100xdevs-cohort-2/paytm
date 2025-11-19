import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signup = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    // Validation
    if (!firstName.trim() || !lastName.trim() || !userName.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/register", {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: userName.trim(),
        password,
      });

      if (res.data.token) {
        // Store token and user info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user?.username || userName);
        localStorage.setItem("firstName", res.data.user?.firstName || firstName);
        localStorage.setItem("userId", res.data.user?.id || "");

        // Navigate to signin
        navigate("/signin");
      } else {
        setError("Signup failed - No token received");
      }
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage = error.response?.data?.error || "Something went wrong!";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleSignup();
    }
  };


  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex justify-center items-center px-4">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-sm px-6 py-8 border border-gray-200">
        
        {/* Title */}
        <Heading label="Create Account" />
        <SubHeading label="Fill in your details to sign up" />

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Inputs */}
        <div className="mt-6 space-y-4">
          <InputBox
            onChange={(e) => {
              setFirstname(e.target.value);
              setError("");
            }}
            onKeyPress={handleKeyPress}
            placeholder="John"
            label="First Name"
            value={firstName}
          />

          <InputBox
            onChange={(e) => {
              setLastname(e.target.value);
              setError("");
            }}
            onKeyPress={handleKeyPress}
            placeholder="Doe"
            label="Last Name"
            value={lastName}
          />

          <InputBox
            onChange={(e) => {
              setUserName(e.target.value);
              setError("");
            }}
            onKeyPress={handleKeyPress}
            placeholder="example@gmail.com"
            label="Email"
            value={userName}
          />

          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            onKeyPress={handleKeyPress}
            type="password"
            placeholder="••••••••"
            label="Password"
            value={password}
          />
        </div>

        {/* Button */}
        <div className="pt-6">
          <Button 
            onClick={handleSignup} 
            label={loading ? "Signing up..." : "Sign up"} 
            className="w-full"
            disabled={loading}
          />
        </div>

        {/* Bottom Link */}
        <div className="mt-4">
          <BottomWarning
            label="Already have an account?"
            buttonText="Sign in"
            to="/signin"
          />
        </div>

      </div>
    </div>
  );
};
