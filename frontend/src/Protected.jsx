import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Protected = ({ Component, authentication = true }) => {
  const navigate = useNavigate();
  const token = "Bearer " + localStorage.getItem("token");

  const sendBack = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/user/me", {
      headers: {
        authorization: token,
      },
    });

    console.log(response.data.credential);
    // console.log(authentication);

    if (authentication && authentication !== response.data.credential) {
      navigate("/signup");
    } else if (!authentication && authentication !== response.data.credential) {
      console.log(authentication);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    sendBack();
  }, []);

  return (
    <>
      <div>
        <Component />
      </div>
    </>
  );
};

export default Protected;
