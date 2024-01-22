import {BrowserRouter, Routes, Route, useNavigate, Navigate} from "react-router-dom";
import {useState} from "react";
import { Signup } from "./routes/Signup";
import {Signin} from "./routes/Signin";
import {Dashboard} from "./routes/Dashboard";
function App() {

  return (
    <div className="w-screen h-screen">
        <BrowserRouter>
          <Routes>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/signin" element={<Signin/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
