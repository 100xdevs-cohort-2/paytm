import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
export function Signin() {
    const [username, setUsername] =useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signIn = async() =>{
        const data = {username, password};
        const response = await makeAuthenticatedPOSTRequest("/api/v1/user/signin", data);

        if (response && !response.err){
            navigate("/dashboard");
        }else{
            alert("Wrong credentials!!!");
        }
        return;
    }

    return(
        <div className="flex flex-col w-full h-full justify-center items-center">
            <div className="flex flex-col items-center justify-center border-2 p-8 rounded-xl">
                <div className="text-3xl font-bold">Sign In</div>
                <div className="my-2 text-gray-500">Enter your credentials to access your account</div>
                <TextInput label="Username" placeholder="johndoe@example.com" className="my-2 mb-4" value={username} setValue={setUsername}/>
                <PasswordInput label="Password" placeholder="" value={password} setValue={setPassword} />
                <div className="w-full flex items-center justify-end my-4">
                    <button className="w-full font-semibold bg-black p-3 px-10 rounded-lg text-white" onClick={(e)=> {e.preventDefault(); signIn();}}>Sign In</button>
                </div>
                <div className="font-bold mb-4 my4 flex  w-full items-center justify-center">
                    <div className="font-semibold">Don't have an account?</div>
                    <Link className="font-semibold mx-2 underline" to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}