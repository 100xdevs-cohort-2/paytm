import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import Deposit from "./pages/Deposit";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/signin" replace />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/send" 
            element={
              <ProtectedRoute>
                <SendMoney />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/deposit" 
            element={
              <ProtectedRoute>
                <Deposit />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
