import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import SendMoney from "./components2/SendMoney";
import Protected from "./Protected";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={<Protected Component={Signup} authentication={false} />}
          />
          <Route
            path="/signin"
            element={<Protected Component={Signin} authentication={false} />}
          />
          <Route
            path="/dashboard"
            element={<Protected Component={Dashboard} />}
          />
          <Route
            path="/send"
            element={<Protected Component={SendMoney} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjAyODBjYmE5MDU1Njk0MTY5ZjVhYzAiLCJpYXQiOjE3MTE0NDAwNzV9.hmbk_XgQzs8LF8QLAW11HEFny70PqqEaMM_yW-Kpk7U
export default App;
