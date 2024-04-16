import { useEffect,useState } from "react"
import axios from "axios";

export const Balance = () => {
const [balance,setBalance] = useState(0);


const token = localStorage.getItem('token');
if (token) {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    axios
        .get("http://localhost:3000/api/v1/account/balance", config)
        .then(response => {
            setBalance(response.data.balance.toFixed(2));
        })
    }


return (<div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
)
}