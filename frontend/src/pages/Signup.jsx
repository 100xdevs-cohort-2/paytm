import { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Subheading from "../components/Subheading";
import Button from "../components/Button";
import axios from "axios";
import BottomWarning from "../components/BottomWarning";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div className="bg-slate-300 min-h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <Subheading label={"Enter your information to create an account"} />

                    <InputBox onChange = {(e) => {
                        setFirstName(e.target.value)
                    }} label={"First Name"} placeholder={"Shubham"} />

                    <InputBox onChange={(e) => {
                        setLastName(e.target.value)
                    }} label={"Last Name"} placeholder={"Singh"} />

                    <InputBox onChange={(e) => {
                        setUsername(e.target.value)
                    }} label={"Email"} placeholder={"shubham@gmail.com"} />

                    <InputBox onChange={(e) => {
                        setPassword(e.target.value)
                    }} label={"Password"} placeholder={""} />

                    <Button onClick={() => {
                        axios.post("/signup", {
                            firstName,
                            lastName,
                            username,
                            password
                        })
                    }} label={"Sign Up"}/>

                    <BottomWarning warning={"Already have an accout?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    )
}

export default Signup;