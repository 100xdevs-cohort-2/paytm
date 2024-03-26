import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Protected = ({ Component }) => {
  // const navigate = useNavigate();
  const [userExists, setUserExists] = useState();

  const token = "Bearer " + localStorage.getItem("token");

  const sendBack = async () => {
    const response = await axios.get("http://localhost:3000/api/v1/user/me", {
      headers: {
        authorization: token,
      },
    });
    console.log(response.data.credential);
    if (response.data.credential) {
      setUserExists(true);
    } 
    // else {
    //   setUserExists(false);
    // }
    if (response.data.credential ) {
      <Navigate to="/signup" />
      console.log("Here")
    }
  };

  sendBack();

  // useEffect(() => {
  // }, []);

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
