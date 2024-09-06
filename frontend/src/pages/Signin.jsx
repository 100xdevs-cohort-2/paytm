import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            placeholder="harkirat@gmail.com"
            label={"Email"}
            Change={(e) => setUsername(e.target.value)}
          />
          <InputBox
            placeholder="123456"
            label={"Password"}
            Change={(e) => setPassword(e.target.value)}
          />
          <div className="pt-4">
            <Button
              label={"Sign in"}
              Click={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    username: username,
                    password: password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
            ></Button>
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
