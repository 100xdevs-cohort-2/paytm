import { useRecoilState } from "recoil";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { modalAtom, usermodalAtom , balanceAtom} from "../atoms/payment";
import {useState} from "react";
import TextInput from "../components/TextInput";

export function Transferwindow2({closemodal, userdata}) {
    
    const [mess, setMess] = useState(false); 
    const [flag, setFlag] = useState(false); 
    const [amount, setAmount] = useState(""); 
    const [balance ,setBalance] = useRecoilState(balanceAtom);

    const {firstName, lastName, to} = userdata;


    const Transfer_money = async () =>{
        const data = {amount , to}
        console.log(data);
        try{
            const response = await makeAuthenticatedPOSTRequest("/api/v1/account/transfer", data);
            if (response.message === "Transfer successful"){
                setMess(false);
            }
            else{
                setMess(true);
            }
            setFlag(true);
        }finally{
            setBalance("");
        }
    }

    return (
        <div className="absolute text-white bg-black bg-opacity-70 w-screen h-screen flex flex-col justify-center items-center" onClick={closemodal}>
            <div className="bg-app-black w-1/4 h-auto rounded-md p-8 text-black border-2 bg-white" onClick={(e) => {e.stopPropagation();}}>
                <div className="flex flex-col justify-center items-center">
                    <div className=" mb-5 font-semibold text-3xl items-center">Send Money</div>
                </div>
                <div className="flex items-center pb-2">
                    <div className="bg-green-400 text-black px-4 py-2 text-lg rounded-full">{firstName[0]+lastName[0]}</div>
                    <div className="text-2xl font-bold px-5">{firstName + " " +lastName}</div>
                </div>
                <div className="space-y-4 flex flex-col justify-center items-center">
                    <TextInput label="Amount (in $)" placeholder="Enter Amount" labelClassName={"text-white text-sm"} value={amount} setValue={setAmount}/>
                    <div className="bg-green-400 w-full rounded flex justify-center items-center font-semibold py-2 mt-4 cursor-pointer text-black" onClick={(e) => {e.preventDefault(); Transfer_money(); }}>
                        Initiate Transfer
                    </div>
                    {mess? <div>Transaction Unsuccessful!!</div> : (flag ? <div>Success!!!</div> : <div></div>)}
                </div>
            </div>
        </div>
    )
}