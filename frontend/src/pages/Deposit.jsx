import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { Heading } from "../components/heading";
import { SubHeading } from "../components/SubHeading";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    // Fetch current balance
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentBalance(response.data.balance || 0);
      } catch (error) {
        console.error("Error fetching balance:", error);
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/signin");
        }
      }
    };

    fetchBalance();
  }, [navigate]);

  const handleDeposit = async () => {
    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) < 1) {
      setError("Minimum deposit amount is ₹1");
      return;
    }

    if (parseFloat(amount) > 1000000) {
      setError("Maximum deposit amount is ₹10,00,000");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/add",
        {
          amount: parseFloat(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess(
          `₹${parseFloat(amount).toLocaleString("en-IN")} deposited successfully!`
        );
        setAmount("");
        setCurrentBalance(response.data.balance);
        
        // Clear success message and redirect after 2 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Deposit error:", error);
      const errorMessage = error.response?.data?.error || "Deposit failed!";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleDeposit();
    }
  };

  const quickAmounts = [100, 500, 1000, 5000];

  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar />
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-gray-200">
            <div className="text-center">
              <Heading label="Deposit Money" />
              <SubHeading label="Add funds to your account" />
            </div>

            {/* Current Balance Display */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl shadow-md">
              <div className="text-sm font-medium opacity-90">Current Balance</div>
              <div className="text-2xl font-bold">
                ₹ {new Intl.NumberFormat("en-IN", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }).format(currentBalance)}
              </div>
            </div>

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

            {/* Quick Amount Buttons */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">
                Quick Amounts
              </div>
              <div className="grid grid-cols-4 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => {
                      setAmount(quickAmount.toString());
                      setError("");
                    }}
                    className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
                  >
                    ₹{quickAmount}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <InputBox
                label="Deposit Amount (in ₹)"
                placeholder="Enter amount"
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                onKeyPress={handleKeyPress}
              />
            </div>

            {/* Deposit Button */}
            <Button
              label={loading ? "Processing..." : "Deposit Money"}
              onClick={handleDeposit}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600"
            />

            {/* Info */}
            <div className="text-xs text-gray-500 text-center">
              Minimum: ₹1 | Maximum: ₹10,00,000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
