import { createContext, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const Login = (token) => {
    localStorage.setItem("token", token);
    // console.log("from Auth Context :- ", localStorage.getItem("token"));
    setIsAuth(true);
  };
  const Logout = () => {
    console.log(isAuth, "from Logout");
    localStorage.removeItem("token");
    setIsAuth(false);
    return <Navigate to="/signin" />;
    // console.log("working");
  };

  return (
    <AuthContext.Provider value={{ isAuth, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};
