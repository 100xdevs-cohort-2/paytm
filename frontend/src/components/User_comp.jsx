import { useRecoilState, useRecoilValue } from "recoil";
import { modalAtom, usermodalAtom } from "../atoms/payment";
import {useState} from "react";
import { Transferwindow } from "../modals/Transferwindow";


export function User_comp({firstName, lastName, userId}) {

    const [transfermodal, setTransfermodal] = useState(false);

    return (
        <>
            {transfermodal && <Transferwindow closemodal={() => {setTransfermodal(false);}} firstName= {firstName} lastName = {lastName} to={userId}/>}
            <div className="flex px-5 h-[15%] justify-between items-center pb-16">
                <div className="flex justify-center items-center">
                    <div className="bg-gray-200 px-4 py-2 text-lg rounded-full">{firstName[0]+lastName[0]}</div>
                    <div className="text-2xl font-bold px-5">{firstName + " " +lastName}</div>
                </div>
                <button className="bg-black text-white rounded-md px-4 py-2" onClick={(e) => {setTransfermodal(true);}}>Send Money</button>
            </div>
        </>
    )
}