import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copyright } from "./Signin";

function TopHeader({ username, image }) {
  const userInitial = username ? username.charAt(0).toUpperCase() : "";
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center border-b border-gray-300 pb-4">
      <h1 className="text-2xl font-bold text-gray-800">Mere Paise Nikal</h1>
      <div className="flex gap-3 items-center">
        <div className="flex gap-3 items-center">
          <span className="text-gray-600 font-semibold">Hello {username}</span>
          {image ? (
            <img src={image} alt="profile" className="w-8 h-8 rounded-full" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold">
              {userInitial || "?"}
            </div>
          )}
        </div>
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
          onClick={() => {
            localStorage.clear();
            navigate("/signin");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function Balance({ balance }) {
  return (
    <div className="flex gap-3 items-center border-b border-gray-300 pb-4 pt-3">
      <h1 className="text-2xl font-bold text-gray-800">Balance</h1>
      <h1 className="text-2xl font-bold text-gray-800">${balance}</h1>
    </div>
  );
}

export function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    >
      {label}
    </button>
  );
}

function UserList({ users = [], searchQuery, onSearchChange }) {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => searchInputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <h1 className="p-2 font-bold text-3xl">User List</h1>
      <input
        type="text"
        placeholder="Search Users"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        autoComplete="on"
        className="p-2 mb-4 border-black rounded-lg w-full"
        style={{ border: "1px solid black" }}
        ref={searchInputRef}
      />
     
      {users.slice(0, 8).map((user) => (
        <div key={user._id} className="flex justify-between pt-2">
          <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
              <div className="flex flex-col justify-center h-full text-xl">
                {user.firstName.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="flex flex-col justify-center h-full">
              <div>
                {user.firstName} {user.lastName}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center h-full">
            <Button
              label={"Send Money"}
              onClick={(e) => {
                e.preventDefault();
                navigate("/send", { state: { user } });
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Dashboard() {
  const [users, setUsers] = useState([]);
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();

  // debouncing the search input to avoid too many requests
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 200);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/signin");
      return;
    }
    setUser(storedUser);

    const getBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          { headers: { Authorization: `Bearer ${storedUser.token}` } }
        );
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setBalance(0);
      }
    };

    getBalance();
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const getUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/bulk",
          {
            params: { filter: debouncedQuery || "" },
          }
        );
        const data = response.data.users;

        // exclude yourself from the list
        const filtered = Array.isArray(data)
          ? data.filter((u) => u._id !== user.id)
          : [];
        setUsers(filtered);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };

    getUsers();
  }, [user, debouncedQuery]);

  if (!user) return null;

  return (
    <div className="p-3 mt-1">
      <TopHeader username={user.name} />
      <Balance balance={balance} />
      <UserList
        users={users}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <Copyright sx={{ mt: 4, mb: 1 }} />
    </div>
  );
}

export default Dashboard;
