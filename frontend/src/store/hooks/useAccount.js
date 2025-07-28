import { useSetRecoilState } from "recoil";
import { accountState } from "../atoms/accountAtom";

export function useAccount() {
  const setAccountDetails = useSetRecoilState(accountState);

  async function checkBalance() {
    try {
      const response = await fetch("api/v1/account/balance", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.status === "success") {
        setAccountDetails((prev) => ({
          ...prev,
          currentBalance: data.data.balance,
          totalMoneySent: data.data.totalSent,
          totalMoneyReceived: data.data.totalReceived,
        }));
        return { success: true };
      } else {
        throw new Error(data.message || "Failed while Checking Balance");
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async function transferFunds(transferDetails) {
    try {
      const response = await fetch("api/v1/account/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(transferDetails),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        await checkBalance();
        await transferHistory();
        return { success: true };
      } else {
        throw new Error(data.message || "Failed while Checking Balance");
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async function transferHistory() {
    try {
      const response = await fetch("api/v1/account/history", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok && data.status === "success") {
        setAccountDetails((prev) => ({
          ...prev,
          transactionHistory: data.data.transactions,
        }));
        return { success: true };
      } else {
        throw new Error(data.message || "Failed while Checking Balance");
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  return { checkBalance, transferFunds, transferHistory };
}
