import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Logo } from "./Logo";
import axios from "axios";
import { useNavigate} from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            axios
                .get("http://localhost:3000/api/v1/user/users?filter=" + filter, config)
                .then(response => {
                    setUsers(response.data.User);
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        }
        else {
            console.error('Token not found in local storage');
        }
    }, [filter]);

    return (
        <>
            <div className="font-bold mt-6 text-2xl p-2">
                Users
            </div>
            <div className="my-2 px-3">
                <input onChange={e => {
                    setFilter(e.target.value);
                }} type="text" placeholder="Search users..." className="w-full px-2 py-2 border rounded border-slate-200"></input>
            </div>
            <div>
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </>
    );
}

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between">
            <div className="flex p-2">
                <Logo label={`${user.firstName}`} />
                <div className="flex flex-col justify-center h-full p-2">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full px-3">
                <Button onClick = {(e) => {
                    navigate("/send?id="+ user._id + "&name=" + user.firstName);
                }

                } label={"Send Money"} />
            </div>
        </div>
    );
}
