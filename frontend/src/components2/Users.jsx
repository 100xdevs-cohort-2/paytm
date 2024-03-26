import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }), [filter];

  return (
    <>
      {/* This is search section */}

      <div>
        <div className="pb-3">
          <div className="font-medium pt-4 pb-1">Users</div>
          <input
            type="text"
            placeholder="Search user"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border w-full"
          />

          <div className="pt-1">
            {users.map((user) => (
              <User user={user} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* This is userList section */
}

const User = ({ user }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between pt-5">
        <div className="flex gap-2">
          <div className="border rounded-xl px-2 border-black text-xl mb-2 bg-slate-700 text-white">
            {user.firstName[0]}
          </div>
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
        <button
          className="border rounded-md bg-gray-800 text-white py-1 px-5"
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}

          
        >
          Send Money
        </button>
      </div>
    </>
  );
};

export default Users;
