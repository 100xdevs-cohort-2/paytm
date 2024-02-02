import { Route,BrowserRouter,Routes } from "react-router-dom"
import  React from "react"
import { Dashboard } from "./pages/Dashboard";
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin";
import { SendMoney } from "./pages/SendMoney";
function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/send" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
