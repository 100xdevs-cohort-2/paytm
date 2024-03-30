import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeading from "./PageHeading";
import PageParagraph from "./PageParagraph";
import PageInputBox from "./PageInputBox";
import Button from "./Button";
import BottomWarn from "./BottomWarn";


import Axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <PageHeading heading={"Sign up"} />
            <PageParagraph
              para={"Enter your information to create an account"}
            />
            <PageInputBox
              name={"First Name"}
              placeholder={"Ayush"}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <PageInputBox
              name={"Last Name"}
              placeholder={"Shivhare"}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <PageInputBox
              name={"Email"}
              placeholder={"ayush@gmail.com"}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <PageInputBox
              name={"Password"}
              placeholder={"12345678"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              bName={"Signup"}
              onClick={async () => {
                const response = await Axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    firstName,
                    lastName,
                    username,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
            />

            <BottomWarn
              para={"Already have an account?"}
              linkName={"Signin"}
              to={"/signin"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
