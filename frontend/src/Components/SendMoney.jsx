import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Copyright } from "./Signin";

export function SendMoney() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // The useLocation hook in React Router is used to access the current location object, which contains information about the URL that was used to navigate to the current route. This includes the pathname, search parameters, hash, and, importantly in this case, the state object that might have been passed along when navigating to this route.
  const { user } = location.state || {};
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const receiver = user._id;
  const [amount, setAmount] = useState("");
  const image = user.image;
  const userInitial = user.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : "";
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleTransfer = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: receiver,
          amount: amount,
        },
        {
          headers: { Authorization: `Bearer ${storedUser.token}` },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        alert("Transfer Successful!");
        navigate("/dashboard");
      } else {
        alert("Transfer failed. Please try again.");
      }
    } catch (error) {
      console.error("Error initiating transfer:", error);
      alert("An error occurred during the transfer.");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg p-6 mt-[200px]">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Send Money
      </h1>
      <div className="flex items-center gap-3 mb-4">
        {image ? (
          <img src={image} alt="profile" className="w-10 h-10 rounded-full" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold">
            {userInitial}
          </div>
        )}
        <p className="text-gray-600 font-semibold text-xl">{user.firstName}</p>
      </div>
      <form onSubmit={handleTransfer}>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-600 mb-2 font-bold"
          >
            Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Money"}
        </button>
      </form>
      <Copyright sx={{ mt: 8, mb: 3 }} />
    </div>
  );
}
