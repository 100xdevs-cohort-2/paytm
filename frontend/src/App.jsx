import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";
const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const SendMoney = lazy(() => import("./pages/SendMoney"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/send' element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
