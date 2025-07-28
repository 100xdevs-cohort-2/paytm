import { atom } from "recoil";

export const accountState = atom({
    key : "accountState",
    default : {
        currentBalance : 0,
        transactionHistory : [],
        totalMoneySent : 0,
        totalMoneyReceived : 0,
    }
})