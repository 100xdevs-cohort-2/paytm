import { Button } from "../components/Button";
import { Heading } from "../components/Header";
import { SubHeading } from "../components/Subheading";
import { InputBox } from "../components/input";
import { BottomWarning } from "../components/Warningoption";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setlarstname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => {
              setlarstname(e.target.value);
            }}
            placeholder="Doe"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => {
              setusername(e.target.value);
            }}
            placeholder="harkirat@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const res = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    password: password,
                  }
                );
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
              }}
              label={"Sign up"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
