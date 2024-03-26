import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Protected = ({ Component }) => {
  const navigate = useNavigate();
  const [userExists, setUserExists] = useState(false);

  const token = "Bearer " + localStorage.getItem("token");

  const sendBack = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/user/me", {
      headers: {
        authorization: token,
      },
    });
    // console.log(response.data.credential);
    if (response.data.credential) {
      setUserExists(false);
    } else {
      setUserExists(true);
    }
  };

  useEffect(() => {
    sendBack();
  }, []);

  return (
    <>
      <div>{userExists ? <Component /> : navigate("/signup")}</div>
    </>
  );
};

export default Protected;
