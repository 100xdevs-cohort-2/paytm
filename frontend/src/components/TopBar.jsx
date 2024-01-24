import { useSetRecoilState } from "recoil";
import { tokenAtom } from "../atoms/payment";
import { useNavigate } from "react-router-dom";


export function TopBar({firstName, lastName}) {
    const navigate = useNavigate();
    const tokenDelete = () => {
        window.location.reload(false);
        navigate("/signin");
        localStorage.removeItem('token');
    }
    return (
        <div className="flex px-5 py-10 h-[10%] justify-between items-center border-b-2">
            <div className="text-3xl font-bold">Payments App</div>
            <div className="flex p-5 space-x-5 w-1/5 justify-end items-center ">
                <div>Hello, {firstName + " " + lastName}</div>
                <button className="bg-gray-200 w-[30%] px-3 text-md p-2 rounded-full" onClick={(e) => {e.preventDefault(); tokenDelete()}}>Log out!</button>
            </div>
        </div>
    )
}