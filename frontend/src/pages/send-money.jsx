import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "../components/input";
import { useRef, useState } from "react";
import axios from "axios";
import ToastSuccess from "../components/toast";

export function Send() {

  const location = useLocation();
  const { reciverId,firstname,lastname} = location.state || {};
  const amountRef=useRef();

  const[label,setlabel]=useState("");
  const[showtoast,setShowoast]=useState(false);
  const navigate=useNavigate();
  async function sendMoney(){
    const amount=amountRef.current.value;

    const response=await axios({
      method:"post",
      url:"http://localhost:3000/api/v1/account/transfer",
      data:{
        to:reciverId,
        amount:amount
      },
      headers: {
        authorization: "Bearer " + localStorage.getItem("token-paytm"),
      },
    })

    if(response.status===202){
      setShowoast(true);
      setlabel(response.data.message)
      setTimeout(()=>{
        navigate("/dashboard")
      },3000)
    }
  }

    return (
      <div className="bg-zinc-200 w-screen h-screen flex justify-center items-center">
        <div className="bg-white w-[30vw] h-auto px-3 rounded-lg">
        <div className="text-center mt-5">
          <span className="text-3xl font-bold font-[poppins]">
            Send Money
          </span>
        </div>
        <div className="mt-10 px-8 flex items-center gap-x-5 ">
          <AvatarIcon
          username={firstname}
          />
          <span
          className="text-2xl font-bold"
          >{firstname} {lastname}</span>
        </div>
        <div className="mt-5 px-3">
        <Input
        placeholder={"Enter Amount"}
        label={"Amount in ₹"}
        refrence={amountRef}
        />
       {showtoast && <ToastSuccess label={label}/>}
        <div className="rounded-md mx-2 p-2 my-5 text-white font-semibold text-center text-xl bg-green-400 cursor-pointer"
        onClick={sendMoney}
        >
        Initate Transfer
        </div>
        </div>
        </div>
      </div>
    )
  };
  
  
  const AvatarIcon = ({username}) => {
    return (
      <div className="bg-green-400 w-12 h-12 rounded-full flex items-center justify-center">
      <span className="text-2xl font-medium text-white">
          {username[0].toUpperCase()}
      </span>
     </div>
    )
  };