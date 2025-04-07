import { useRef, useState } from "react";
import HeaderCompo from "../components/header";
import { useGetBalance } from "../hooks/useGetBalance";
import { FiRefreshCcw } from "react-icons/fi";
import { SearchBox } from "../components/search-box";
import axios from "axios";
import UserCard from "../components/user-card";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";


export function Dashboard() {

  const { balance, fetchBalance } = useGetBalance()
  const userRef = useRef("");
  const [recipents, setRecipents] = useState({});
  const navigate=useNavigate();

  async function fetchUser() {
    const username = userRef.current.value.toLowerCase();
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/api/v1/user/bulk/?filter=" + username,
      headers: {
        authorization: "Bearer " + localStorage.getItem("token-paytm"),
      },
    });

    setRecipents(response.data);
    console.log(recipents.user);
  }


  return (
    <div className="w-screen h-screen">
      <HeaderCompo username={"Jay"} />
      <div className="px-5 mt-5 flex items-center justify-between">
       <div className="flex gap-x-3 items-center">
       <span className="text-2xl font-medium">Your Balance ₹ {balance}</span>
       <FiRefreshCcw className="text-2xl cursor-pointer" 
       onClick={fetchBalance}
       />
       </div>
       <div>
       <TbLogout className="text-2xl mr-3 hover:text-3xl cursor-pointer duration-200" 
       onClick={()=>{
        localStorage.removeItem("token-paytm");
        setTimeout(()=>{
          navigate("/signin")
        },2000)
       }}
       />
       </div>
      </div>
      <div className="mt-3 px-5">
        <SearchBox
          placeholder={"Search User...."}
          refrence={userRef}
          onchangeFun={fetchUser}
        />
      </div>
      <div className="mt-3 px-5">
        {recipents.user?.map((user, index) => (
          <UserCard key={index} 
          firstname={user.firstname} 
          lastname={user.lastname}
          username={user.username}
          Id={user._id}
          />
        ))}
      </div>
    </div>
  );
}
