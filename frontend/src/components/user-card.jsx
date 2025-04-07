import { useEffect, useState } from "react";
import AvatarIcon from "./avatar-icom";
import { useNavigate } from "react-router-dom";

const UserCard = ({ firstname,lastname,username,Id }) => {
  function capitalizeEachWord(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  const formattedUsername = capitalizeEachWord(firstname)+capitalizeEachWord(lastname);


  const[reciverId,setReciverid]=useState("");
  useEffect(()=>{
    setReciverid(Id)
  },[])
  console.log(reciverId);
  return (
    <div className="w-full h-20 rounded-md border-2 flex items-center justify-between hover:bg-zinc-100">
      <div className="flex items-center px-5 gap-x-3">
        <AvatarIcon username={firstname} />
        <span className="text-xl font-medium">{formattedUsername}</span>
      </div>
      <SendMoneyBtn
      reciverId={reciverId}
      firstname={firstname}
      lastname={lastname}
      />
    </div>
  );
};

function SendMoneyBtn({reciverId,firstname,lastname}) {
    const navigate=useNavigate();
  return (
    <div className="bg-zinc-800 hover:bg-black cursor-pointer w-32 h-9 rounded-md mx-5 flex items-center justify-center">
      <span className="text-white font-medium "
      onClick={()=>{
        navigate("/send",{
            state:{
                reciverId:reciverId,
                firstname:firstname,
                lastname:lastname
            }
        })}}
      >Send Money</span>
    </div>
  );
}

export default UserCard;
