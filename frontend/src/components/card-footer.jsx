import { useNavigate } from "react-router-dom";

export function Footer({label1,label2,link}){

    const navigate=useNavigate();

    return(
        <div className="mx-3 my-2 text-zinc-700 font-medium p-2 flex gap-x-1 justify-center">
            <span>{label1}</span>
            <span className="underline cursor-pointer" onClick={()=>navigate(link)} >{label2}</span>
        </div>
    )
}