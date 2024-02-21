import React from "react";
import Signup from "../Pages/Signup";
import Signin from "../Pages/Signin";
import Dashboard from "../Pages/Dashboard";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const linkObject = [
    { path: "/signup", title: "Signup" },
    { path: "/signin", title: "Signin" },
    { path: "/dashboard", title: "Dashboard" },
  ];

  const allLinks = linkObject.map((item) => (
    <NavLink key={item.path} to={item.path}>
      {item.title}
    </NavLink>
  ));
  return <div>{allLinks}</div>;
};

export default NavBar;
