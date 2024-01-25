import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {makeUnauthenticatedPOSTRequest} from '../utils/serverHelpers';
import { RecoilRoot, useRecoilState , useSetRecoilState} from "recoil";
import { tokenAtom } from "../atoms/payment";
export function Signup () {
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] =useState("");
    const settokenAtom = useSetRecoilState(tokenAtom);
    const navigate = useNavigate();

    const signUp = async() => {
        const data = {firstName, lastName, username, password}
        const response = await makeUnauthenticatedPOSTRequest("/api/v1/user/signup", data);

        if (response && !response.err){
            const token = response.token;
            localStorage.setItem('token', token);
            settokenAtom(tokenAtom => tokenAtom = token);
            navigate("/dashboard");
        }else{
            alert("Failure");
        }
        return ;
    }

    return (
            <div className="flex flex-col w-full h-full justify-center items-center">
                <div className="flex flex-col items-center justify-center border-2 p-8 rounded-xl">
                    <div className="text-3xl font-bold">Sign Up</div>
                    <div className="my-2 text-gray-500">Enter your information to create an account</div>
                    <TextInput label="First Name" placeholder="John" className="my-2" value={firstName} setValue={setFirstName}/>
                    <TextInput label="Last Name" placeholder="Doe" className="my-2" value={lastName} setValue={setLastName}/>
                    <TextInput label="Username" placeholder="johndoe@example.com" className="my-2 mb-4" value={username} setValue={setUsername}/>
                    <PasswordInput label="Password" placeholder="" value={password} setValue={setPassword} />
                    <div className="w-full flex items-center justify-end my-4">
                        <button className="w-full font-semibold bg-black p-3 px-10 rounded-lg text-white" onClick={(e)=> {e.preventDefault(); signUp();}}>Sign Up</button>
                    </div>
                    <div className="font-bold mb-4 my4 flex  w-full items-center justify-center">
                        <div className="font-semibold">Already have an account?</div>
                        <Link className="font-semibold mx-2 underline" to="/signin">Login</Link>
                    </div>
                </div>
            </div>
    )
}