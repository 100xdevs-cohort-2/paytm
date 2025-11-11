import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./Components/Signup";
import { Dashboard } from "./Components/Dashboard";
import { Signin } from "./Components/Signin";
import { SendMoney } from "./Components/SendMoney";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
