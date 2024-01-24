import { MiddleBar } from "../components/MiddleBar";
import { TopBar } from "../components/TopBar";
import { User_comp } from "../components/User_comp";
import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { useRecoilState } from "recoil";
import { balanceAtom, currentAtom, userfilterAtom, usersAtom } from "../atoms/payment";

export function Dashboard() {
    const [balance ,setBalance] = useRecoilState(balanceAtom);
    const [filter, setFilter] = useRecoilState(userfilterAtom);
    const [users, setUsers] = useRecoilState(usersAtom);
    const [loading , setLoading] = useState(true);
    const [currentuser , setCurrentUser] = useRecoilState(currentAtom);
    
    useEffect(() => {
        const get_info = async () =>{
        try{
            const response = await makeAuthenticatedGETRequest("/api/v1/account/balance");
            const temp_balance = parseFloat(response.balance).toFixed(2);
            setBalance(balance => balance = temp_balance);
            const url =(filter ? "/api/v1/user/bulk?filter="+filter : "/api/v1/user/bulk");
            const response_2 = await makeAuthenticatedGETRequest(url);
            setUsers(users => users = response_2.user);
        }finally{
            const current_user = users.filter( user => user.username === "Current User");
            if (current_user.length == 1){
                setCurrentUser(current_user[0]);
            }
            setLoading(false);
        }
        }
        get_info();
    }, [balance, users]);
    return (
        <div className="w-full h-full">
            <div className="flex flex-col h-full w-full">
                {loading ? <p className="animate-pulse text-2xl justify-center items-center flex bg-black h-full"> Loading ....... </p> : 
                <>
                    <TopBar firstName={currentuser.firstName} lastName={currentuser.lastName}/>
                    <MiddleBar balance = {balance}/>
                    <div>
                        {users.map(function (user) {
                            if (user.username != "Current User"){
                                return <User_comp firstName={user.firstName} lastName={user.lastName}/>
                            }
                        })}
                    </div>
                </>
                }
            </div>
        </div>
    )
}