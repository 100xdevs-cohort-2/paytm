import {BrowserRouter, Routes, Route, useNavigate, Navigate} from "react-router-dom";
import {useState} from "react";
import { Signup } from "./routes/Signup";
import {Signin} from "./routes/Signin";
import {Dashboard} from "./routes/Dashboard";
import {RecoilRoot, useRecoilValue} from "recoil";
import {tokenAtom} from "./atoms/payment";
function App() {

  const token = useRecoilValue(tokenAtom);

  return (
        <div className="w-screen h-screen">
            <BrowserRouter>
              {localStorage.getItem('token') ? (
                <Routes>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="*" element={<Dashboard/>}/>
                </Routes>
              ) : (
                <Routes>
                  <Route path="/signup" element={<Signup/>}/>
                  <Route path="/signin" element={<Signin/>}/>
                  <Route path="*" element={<Signin/>}/>
                </Routes>
              )} 
            </BrowserRouter>
        </div>
  )
}

export default App
