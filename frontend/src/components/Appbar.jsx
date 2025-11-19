import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
  const [firstName, setFirstName] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("firstName") || localStorage.getItem("username");
    if (name) setFirstName(name);
  }, []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
    setOpenMenu(false);
  };
  const handleDeposit = () => {
    navigate("/deposit");
    setOpenMenu(false);
  };
  const getInitial = () => {
    return firstName ? firstName.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className="shadow-md h-16 px-6 flex items-center justify-between bg-white relative z-50">
      <div 
        className="text-xl font-semibold text-blue-600 tracking-wide cursor-pointer"
        onClick={handleDashboard}
      >
        PayTM
      </div>

      <div className="flex items-center gap-4" ref={menuRef}>
        <span className="text-gray-700 font-medium hidden sm:block">
          Hello, {firstName || "User"}
        </span>

        {/* Profile Avatar */}
        <div
          className="h-12 w-12 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-700 font-semibold text-lg cursor-pointer hover:bg-blue-200 transition"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {getInitial()}
        </div>

        {/* Dropdown Menu */}
        {openMenu && (
          <div className="absolute right-0 top-16 bg-white border shadow-lg rounded-md w-40 overflow-hidden z-50">
            <button
              onClick={handleDeposit}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              Deposit Money
            </button>
            <button
              onClick={handleDashboard}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
