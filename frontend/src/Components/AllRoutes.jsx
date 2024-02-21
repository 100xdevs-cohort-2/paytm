/* eslint-disable no-unused-vars */

import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../Pages/Signup";
import Signin from "../Pages/Signin";
import Dashboard from "../Pages/Dashboard";
import { Transfer } from "./Transfer";
import PrivateRoutes from "./PrivateRoutes";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element=<Signup /> />
        <Route path="/signin" element=<Signin /> />
        <Route
          path="/dashboard"
          element=<PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        />
        <Route
          path="/dashboard/transfer"
          element=<PrivateRoutes>
            <Transfer />
          </PrivateRoutes>
        />
        {/* <Route path='/signup' element=</>/> */}
      </Routes>
    </div>
  );
};

export default AllRoutes;
