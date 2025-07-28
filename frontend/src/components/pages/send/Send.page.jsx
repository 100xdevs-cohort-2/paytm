import React, { useEffect, useRef, useState } from "react";
import Alert from "../../ui/Alert";
import { useLogin } from "../../../store/hooks/useLogin";

function Send({ handleCancel, handleFunds }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [alert, setAlert] = useState(null);
  const { getUsers } = useLogin();
  const paymentOptions = ["Bank Transfer", "PayPal", "Credit Card"];
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(
    paymentOptions[0]
  );
  const [transferData, setTransferData] = useState({
    name: "",
    amount: 0,
    to: "",
  });

  async function handleTransferFunds(e) {
    e.preventDefault();
    if (!transferData.amount > 0 || !transferData.to) {
      setAlert({
        type: "warning",
        title: "Fill the Details Correctly",
        message: `Invalid Details`,
      });
      setTimeout(() => {
        setAlert(null);
        setTransferData({ name: "", amount: 0, to: "" });
      }, 3000);
    } else {
      const status = await handleFunds(transferData);
      console.log("response from handleFunds", status);

      if (status.success) {
        setAlert({
          type: "success",
          title: "Transfer Successful",
          message: `₹${transferData.amount} sent to ${transferData.name}`,
        });
        setTimeout(() => {
          setAlert(null);
          setTransferData({ name: "", amount: 0, to: "" });
        }, 3000);
      } else {
        setAlert({
          type: "error",
          title: "Transfer Failed",
          message:
            status.message || "Something went wrong while sending money.",
        });
        setTimeout(() => {
          setAlert(null);
          setTransferData({ name: "", amount: 0, to: "" });
        }, 3000);
      }
    }
  }

  const suggestionRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    async function fetchingData() {
      try {
        const res = await getUsers();
        setUsers(res.users || []);
        setFilteredUsers(res.users);
        console.log(users);
      } catch (error) {
        throw Error("Error Occurred in Send Page");
      }
    }
    fetchingData();
  }, []);

  return (
    <>
      {alert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Alert {...alert} />
        </div>
      )}
      <div className="p-4">
        <div className="max-w-md mx-auto bg-slate-900 rounded-xl overflow-hidden">
          <div className="flex justify-between p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
            <h2 className="text-2xl font-semibold text-white">Send Money</h2>
            <button
              type="button"
              onClick={handleCancel}
              className="cursor-pointer bg-white rounded-md p-2 inline-flex items-center justify-center text-black-400 hover:text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <div className="flex mb-6 bg-slate-800 rounded-md overflow-hidden">
              {paymentOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedPaymentOption(option)}
                  className={`cursor-pointer flex-1 py-3 px-1 text-sm text-center text-slate-400 font-medium ${
                    selectedPaymentOption === option
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {selectedPaymentOption === "Bank Transfer" ? (
              <form>
                <div className="mb-4 relative" ref={suggestionRef}>
                  <label
                    className="block text-slate-300 text-sm mb-2"
                    htmlFor="sendMoney"
                  >
                    Send Money To :
                  </label>

                  <input
                    type="text"
                    id="to"
                    name="to"
                    className="px-4 py-2.5 bg-slate-800 border border-slate-600 text-slate-300 w-full text-sm rounded-md outline-0"
                    placeholder="Receiver's name"
                    value={transferData.name}
                    onFocus={() => {
                      if (users.length > 0) setShowSuggestions(true);
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      setTransferData((prev) => ({ ...prev, name: value }));

                      const filtered = users.filter((user) =>
                        user.username
                          .toLowerCase()
                          .includes(value.toLowerCase())
                      );
                      setFilteredUsers(filtered);
                      setShowSuggestions(true);
                    }}
                    required
                  />

                  {showSuggestions && filteredUsers.length > 0 && (
                    <ul className="absolute left-0 right-0 z-10 bg-slate-800 border border-slate-600 text-slate-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                      {filteredUsers.map((user) => (
                        <li
                          key={user._id}
                          className="px-4 py-2 cursor-pointer hover:bg-slate-700"
                          onClick={() => {
                            setTransferData((prev) => ({
                              ...prev,
                              name: user.username,
                              to: user._id,
                            }));
                            setShowSuggestions(false);
                          }}
                        >
                          {user.username}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    className="block text-slate-300 text-sm mb-2"
                    htmlFor="amount"
                  >
                    Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      className="px-4 py-2.5 bg-slate-800 border border-slate-600 text-slate-300 w-full text-sm rounded-md outline-0"
                      placeholder="Enter Amount in ₹"
                      value={transferData.amount}
                      onChange={(e) =>
                        setTransferData((prev) => ({
                          ...prev,
                          [e.target.name]: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-4">
                  <button
                    type="button"
                    onClick={handleTransferFunds}
                    className="cursor-pointer w-full py-2.5 px-4 rounded-md flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-sm text-white font-medium transition-colors"
                  >
                    Pay{" "}
                    {transferData.amount > 0 ? `₹${transferData.amount}` : null}
                  </button>
                  <div className="flex items-center justify-center text-center text-slate-400 text-m">
                    <span>Secure payment powered by </span>
                    <img
                      className="m-2 h-auto"
                      src="/images/paytm-logo.svg"
                      alt="Paytm Logo"
                    />
                  </div>
                </div>
              </form>
            ) : (
              <div className="m-10 text-white">
                <h1>This Payment Option is not Available yet.!!</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Send;
