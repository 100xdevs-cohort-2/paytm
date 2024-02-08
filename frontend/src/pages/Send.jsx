import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Header";
import { InputBox } from "../components/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

export const SendMoney = () => {
  const [Searchparam] = useSearchParams();
  const id = Searchparam.get("id");
  const name = Searchparam.get("name");

  const [money, setmoney] = useState(0);
  const token = localStorage.getItem("token");
  const completetoken = "Bearer " + token;
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-lg w-80 text-center">
          <Heading label={"Send Money"} />
          <div className="flex items-center p-4 pt-10 font-semibold">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
              <div className="flex flex-col justify-center h-full text-xl">
                {name[0]}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center h-full">
              <div>{name}</div>
            </div>
          </div>
          <InputBox
            label={"Amount"}
            placeholder={"Enter Amount"}
            onChange={(e) => {
              setmoney(e.target.value);
            }}
          />
          <div className="p-4">
            <Button
              label={"Send Money"}
              onClick={async () => {
                const res = await axios.post(
                  "http://localhost:3000/api/v2/account/transfer",
                  {
                    amount: parseInt(money),
                    to: id,
                  },
                  {
                    headers: {
                      authorization: completetoken,
                    },
                  }
                );
                navigate("/dashboard");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
