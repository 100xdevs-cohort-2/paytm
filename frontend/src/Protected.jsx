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
    if (authentication && authentication !== response.data.credential) {
      navigate("/signup");
    } else if (!authentication && authentication !== response.data.credential) {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    sendBack();
  }, []);

  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjAyNzMyMTIzYTZlM2Y2MTAzODYzNTEiLCJpYXQiOjE3MTE0MzY1Nzd9.SiPYx8ptv0DS-FyGQkoNF_a7hHl0D36xmJY8TK9m100
  return (
    <>
      <div>
        <Component />
      </div>
    </>
  );
};

export default Protected;
