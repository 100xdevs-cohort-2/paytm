import axios from "axios";
import { useEffect, useState } from "react";

export function useGetBalance(){
    const[balance,setBalance]=useState(0);

    async function fetchBalance(){
        const res=await axios({
            method:"get",
            url:"http://localhost:3000/api/v1/account/balance",
            headers:{
                authorization:"Bearer "+localStorage.getItem("token-paytm")
            }
        });
        setBalance(res.data.balance);
    }
    return{
        fetchBalance,
        balance
    }
}