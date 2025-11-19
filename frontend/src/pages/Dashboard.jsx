import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBalance(response.data.balance || 0);
      } catch (error) {
        console.error("Error fetching balance:", error);
        // If unauthorized, redirect to signin
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/signin");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <Appbar />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Balance Card */}
        <div className="mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="text-gray-500">Loading balance...</div>
              </div>
            ) : (
              <Balance value={balance} />
            )}
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <Users />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
