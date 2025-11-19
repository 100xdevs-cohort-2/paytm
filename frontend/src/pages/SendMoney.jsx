import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const userId = searchParams.get("id");
  const userName = searchParams.get("name") || "User";
  const userUsername = searchParams.get("username") || "";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
    if (!userId) {
      navigate("/dashboard");
    }
  }, [navigate, userId]);

  const handleTransfer = async () => {
    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) < 1) {
      setError("Minimum transfer amount is ₹1");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: userId,
          amount: parseFloat(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message) {
        setSuccess(response.data.message);
        setAmount("");
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Transfer error:", error);
      const errorMessage = error.response?.data?.error || "Transfer failed!";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleTransfer();
    }
  };

  const getInitial = () => {
    return userName.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar />
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-4">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Send Money
            </h2>

            {/* Success Message */}
            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Recipient Info */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-2xl text-white font-semibold">
                    {getInitial()}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {userName}
                  </h3>
                  {userUsername && (
                    <p className="text-sm text-gray-500">{userUsername}</p>
                  )}
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <InputBox
                  label="Amount (in ₹)"
                  placeholder="Enter amount"
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setError("");
                  }}
                  onKeyPress={handleKeyPress}
                />
              </div>

              {/* Transfer Button */}
              <Button
                label={loading ? "Processing..." : "Initiate Transfer"}
                onClick={handleTransfer}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};