import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import PaymentTable from "../../ui/PaymentTable";
import Alert from "../../ui/Alert";
import Send from "../send/Send.page";
import { useAccount } from "../../../store/hooks/useAccount";
import { accountState } from "../../../store/atoms/accountAtom";
import Loader from "../../ui/Loader"

function PaymentHistory() {
  const accountValues = useRecoilValue(accountState);
  const { checkBalance, transferFunds, transferHistory } = useAccount();
  const [transactions, setTransactions] = useState({
    sent: 1200,
    received: 545,
  });
  const [alert, setAlert] = useState(null);
  const [sendMoney, setSendMoney] = useState(false);
  // const navOptions = ["Account", "Settings", "Orders", "Sales", "Suppliers"]
  const navOptions = [];
  const [loading, setLoading] = useState(true);
  const columnName = [
    "Sender / To",
    "Balance Before",
    "Balance After",
    "Type",
    "Amount",
    "Date",
  ];

  useEffect(() => {
    async function handleCheckBalance(){
      await checkBalance();
      await transferHistory();
      setLoading(false)
    }
    handleCheckBalance()
  }, []);

  async function handleFunds(data) {
    return await transferFunds(data);
  }

  return (
    <>
      {alert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Alert {...alert} />
        </div>
      )}
      {sendMoney && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Send
            handleFunds={(transferData) => handleFunds(transferData)}
            handleCancel={() => setSendMoney(!sendMoney)}
          />
        </div>
      )}
      <div className="font-sans overflow-x-hidden">
        <div className="mx-auto max-w-screen-xl bg-white">
          <div className="flex justify-between">
            <h1 className="mt-5 mb-5 ml-5 text-2xl font-bold text-gray-900">
              Payment History
            </h1>
            <div>
              <button
                type="button"
                onClick={() => setSendMoney(true)}
                className="cursor-pointer text-white m-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Send Money
              </button>
            </div>
          </div>

          <div className="bg-white py-2 px-3">
            {navOptions && (
              <nav className="flex flex-wrap gap-4">
                {navOptions.map((tab) => (
                  <a
                    key={tab}
                    href="#"
                    className={`inline-flex whitespace-nowrap border-b-2 py-2 px-3 text-sm font-medium transition-all duration-200 ease-in-out ${
                      tab === "Orders"
                        ? "border-b-purple-600 text-purple-600 font-semibold"
                        : "border-transparent text-gray-600 hover:border-b-purple-600 hover:text-purple-600"
                    }`}
                  >
                    {tab}
                  </a>
                ))}
              </nav>
            )}
          </div>

          <div className="px-5 pb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
              <div className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 bg-purple-50 border border-purple-200 p-6 rounded-xl shadow-sm">
                <h2 className="text-sm font-semibold text-white-700 mb-1">
                  Current Balance :
                </h2>
                {loading ? (
                  <Loader/>
                ) : (
                  <p className="text-3xl font-bold text-purple-900">
                    ₹{accountValues.currentBalance}
                  </p>
                )}
              </div>

              <div className="text-white-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 bg-purple-50 border border-purple-200 p-6 rounded-xl shadow-sm">
                <h2 className=" text-sm font-semibold text-white-700 mb-1">
                  Transactions Sent
                </h2>
                {loading ? (
                  <Loader/>
                ) : (
                  <p className="text-3xl font-bold text-white-900">
                    ₹{accountValues.totalMoneySent}
                  </p>
                )}
              </div>

              <div className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 bg-green-50 border border-green-200 p-6 rounded-xl shadow-sm">
                <h2 className="text-sm font-semibold text-white-700 mb-1">
                  Transactions Received
                </h2>
                {loading ? (
                  <Loader/>
                ) : (
                  <p className="text-3xl font-bold text-green-900">
                    ₹{accountValues.totalMoneyReceived}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-screen bg-gray-50">
          <div className="mx-auto max-w-screen-xl px-2 py-10">
            <div className="mt-4 w-full">
              <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
                <form className="relative flex w-full max-w-2xl items-center">
                  <svg
                    className="absolute left-2 block h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    name="search"
                    className="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2"
                    placeholder="Search Customer"
                  />
                </form>
                <button
                  type="button"
                  className="relative mr-auto inline-flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 focus:shadow sm:mr-0"
                >
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  <svg
                    className="mr-2 h-3 w-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filter
                </button>
              </div>
            </div>

            <PaymentTable columnData={accountValues.transactionHistory} columnName={columnName} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentHistory;
