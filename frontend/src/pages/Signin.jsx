import { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Subheading from "../components/Subheading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div className="bg-slate-300 min-h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign In"} />
                    <Subheading label={"Enter your information to sign in."} />

                    <InputBox onChange={(e) => {
                        setUsername(e.target.value)
                    }} label={"Email"} placeholder={"shubham@gmail.com"} />

                    <InputBox onChange={(e) => {
                        setPassword(e.target.value)
                    }} label={"Password"} placeholder={""} />

                    <Button onClick={() => {
                        axios.post("/signin", {
                            username,
                            password
                        })
                    }} label={"Sign In"}/>
                    <BottomWarning warning={"Don't have an accout?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    )
}

export default Signin;