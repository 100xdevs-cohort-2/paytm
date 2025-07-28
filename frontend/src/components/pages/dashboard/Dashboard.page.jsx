import React, { useState } from "react";
import Navbar from "../../ui/Navbar";
import PaymentHistory from "../payment-history/paymentHistory.page";

function Dashboard() {
  const navOptions = [
    {
      name: "Dashboard",
      component: <Dashboard />,
    },
    {
      name: "Pay Bills",
      component: "",
    },
    {
      name: "Recharge",
      component: "",
    },
    {
      name: "Book Tickets",
      component: "",
    },
    {
      name: "Send Money",
      component: "",
    },
  ];
  const [selectedOption, setSelectedOption] = useState(navOptions[0].name);

  function handleSelectedOption(name) {
    setSelectedOption(name);
  }

  return (
    <>
      <div>
        <Navbar
          navOptions={navOptions}
          selectedOption={selectedOption}
          handleSelectedOption={handleSelectedOption}
        />
      </div>
      <div>
        <PaymentHistory />
      </div>
    </>
  );
}

export default Dashboard;
