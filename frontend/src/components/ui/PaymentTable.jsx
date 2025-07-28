import React from "react";

function PaymentTable({ columnName, columnData, className }) {
  console.log(columnData);
  return (
    <>
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white shadow-sm rounded-lg">
          <thead className="bg-gray-100 text-sm font-medium text-gray-600">
            <tr>
              {columnName.map((columnName) => (
                <th key={columnName} className="px-4 py-3 text-left">
                  {columnName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {columnData.length > 0 ? (
              columnData.map((txn, idx) => (
                <tr
                  key={idx}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{txn.counterparty.username}</td>
                  <td className="px-4 py-3">₹{txn.balanceBefore}</td>
                  <td className="px-4 py-3">₹{txn.balanceAfter}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        txn.type === "Received"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {txn.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">₹{txn.amount}</td>
                  <td className="px-4 py-3">{txn.createdAt.split("T")[0]}</td>
                </tr>
              ))
            ) : (
              <div className="flex justify-center align-center">
                <h1>You have No Transaction Yet.</h1>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PaymentTable;
