import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validation
    if (!userName.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        {
          username: userName.trim(),
          password,
        }
      );

      if (res.data.token) {
        // Store token and user info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user?.username || userName);
        localStorage.setItem("firstName", res.data.user?.firstName || "");
        localStorage.setItem("userId", res.data.user?.id || "");
        
        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        setError("Login failed - No token received");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.error || "Invalid credentials!";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleLogin();
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex justify-center items-center px-4">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-sm px-6 py-8 border border-gray-200">
        
        {/* Title */}
        <Heading label="Sign In" />
        <SubHeading label="Enter your credentials to access your account" />

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Input Fields */}
        <div className="mt-6 space-y-4">
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
            onClick={handleLogin} 
            label={loading ? "Signing in..." : "Sign in"} 
            className="w-full"
            disabled={loading}
          />
        </div>

        {/* Bottom Text */}
        <div className="mt-4">
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
