import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SendMoney = () => {
  const [amount, setAmount] = useState("");

  const [searchParams] = useSearchParams();

  const friendName = searchParams.get("name");
  const friendId = searchParams.get("id");

  return (
    <div className=" flex justify-center pt-56">
      <div className="border rounded-xl border-black px-8 py-8 shadow-2xl">
        <div className="flex justify-center text-3xl font-medium">
          Send Money
        </div>

        <div className="flex flex-col pt-10 gap-1">
          <div className="flex gap-3">
            <div className="border rounded-xl px-2 border-black text-xl bg-slate-700 text-white">
              {friendName[0]}
            </div>
            <div>{friendName}</div>
          </div>
          <p className=" text-sm font-light">Amount (in Rs)</p>
          <input
            type="number"
            placeholder="Enter amount"
            onChange={(e) => setAmount(e.target.value)}
            className="border border-black rounded-md "
          />
          <button
            className="border rounded-md bg-green-500 text-white py-1 mt-3"
            onClick={async () =>
              await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                  to: friendId,
                  amount,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              )
            }
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
