import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();


    const handleSignIn = async () => {
        if (isSubmitting) return;  //Prevent multiple submissions
        setIsSubmitting(true);   //  Indicate that submission is in progress

        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username: email,
                password: password
            });

            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Signin error:" + error);
        }
        finally {
            setIsSubmitting(false); //Reset submission state after requset complete
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credential to access your account"} />
                    <InputBox placeholder={"abc@gmail.com"} label={"Email"} onChange={(e) => setEmail(e.target.value)} />
                    <InputBox placeholder={"1234"} label={"Password"} onChange={(e) => setPassword(e.target.value)} />
                    <div className='pt-4'>
                        <Button label={"Sign in"} onClick={handleSignIn} disabled={isSubmitting} />
                        <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
                    </div>
                </div>
            </div>
        </div>
    )
}