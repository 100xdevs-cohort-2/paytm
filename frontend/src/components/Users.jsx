import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import axios from "axios";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/bulk", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Filter out current user
        const currentUsername = localStorage.getItem("username");
        const filteredUsers = response.data.users.filter(
          (user) => user.username !== currentUsername
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/signin");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || user.username.toLowerCase().includes(query);
  });

  const handleSendMoney = (user) => {
    navigate(`/send?id=${user._id}&name=${encodeURIComponent(`${user.firstName} ${user.lastName}`)}&username=${encodeURIComponent(user.username)}`);
  };

  return (
    <>
      <div className="font-bold mt-6 text-xl text-gray-800">Users</div>

      <div className="my-3">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
        />
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading users...</div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchQuery ? "No users found matching your search" : "No users found"}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <User key={user._id} user={user} onSendMoney={handleSendMoney} />
          ))}
        </div>
      )}
    </>
  );
};

function User({ user, onSendMoney }) {
  return (
    <div className="flex justify-between items-center bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="rounded-full h-14 w-14 bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-xl">
          {user.firstName?.[0]?.toUpperCase() || "U"}
        </div>

        {/* Name */}
        <div>
          <div className="font-semibold text-gray-900 text-lg">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm text-gray-500">{user.username}</div>
        </div>
      </div>

      {/* Right Section */}
      <div>
        <Button 
          label="Send Money" 
          onClick={() => onSendMoney(user)}
        />
      </div>
    </div>
  );
}
