import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected2({ Component }) {
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem("token");

    if (login) {
      navigate("/dashboard");
    }
  }),
    [];

  return (
    <>
      <div>
        <Component />
      </div>
    </>
  );
}

export default Protected2;
