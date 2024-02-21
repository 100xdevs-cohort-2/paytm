import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Dialog from "./Dialog";

export const Transfer = () => {
  const [balanceToTransfer, setBalanceToTransfer] = React.useState("");
  // const [state, setState] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const firstName = searchParams.get("name");
  const lastName = searchParams.get("lname");

  const navigate = useNavigate();
  const handleBalance = (e) => {
    setBalanceToTransfer(e.target.value);
  };

  const transferDetails = {
    to: id,
    amount: balanceToTransfer,
  };
  const Transfering = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/account/transfer`,
        transferDetails,
        {
          headers: {
            Authorization: "Bearer" + " " + localStorage.getItem("token"),
          },
        }
      );
      if (response.status >= 200) {
        // alert(`Transfer Succesfful:- ${balanceToTransfer}`);
        // setState(true);
        navigate(-1);
        setBalanceToTransfer("");
      }
    } catch (error) {
      console.log(
        `Error from transfering
       :-`,
        error.response.data.msg
      );
    }
  };

  return (
    <div>
      <div className="w-1/3 m-auto rounded-md shadow-2xl flex flex-col gap-10 p-4 border-2">
        <div>
          <h1 className="text-3xl font-bold text-center">Send Money</h1>
        </div>
        <div>
          <div className="flex justify-center items-center gap-5">
            <div className="rounded-full w-10 h-10 text-xl flex justify-center items-center bg-green-500 text-white">
              {firstName ? firstName[0] : ""}
            </div>
            <div className="text-xl font-medium ">
              <h2>{`${firstName} ${lastName}`}</h2>
            </div>
          </div>
          <div className="mt-7">
            <p> Amount (in Rs)</p>
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="number"
              placeholder="Enter Amount"
              value={balanceToTransfer}
              onChange={handleBalance}
              className="border-2 text-2xl mt-4 font-semibold focus:outline-none  border-gray-200"
            />
            <button
              className="bg-green-500 rounded-md text-xl h-10 text-white"
              onClick={Transfering}
            >
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
