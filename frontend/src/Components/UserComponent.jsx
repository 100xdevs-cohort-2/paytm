import React, { useState } from "react";
import ButtonComponent from "./ButtonComponent";
import { useNavigate } from "react-router-dom";

const UserComponent = ({ user }) => {

  const navigate = useNavigate();
  const handleUser = (e) => {
    navigate(`transfer?id=${user.id}&name=${user.firstname}&lname=${user.lastname}`);
  };

  return (
    <div className="flex justify-between items-center ">
      <div className="flex gap-5 items-center justify-center">
        <div className="rounded-full w-10 h-10 flex justify-center items-center bg-[#f2f2f2] text-black">
          <h2>{user.firstname[0]}</h2>
        </div>
        <div>
          <h2>{`${user.firstname} ${user.lastname}`}</h2>
        </div>
      </div>
      <div>
        <ButtonComponent title={"Send Money"} handleUser={handleUser} />
      </div>
    </div>
  );
};

export default UserComponent;
