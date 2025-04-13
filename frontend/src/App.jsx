    import { BrowserRouter, Route, Routes } from "react-router-dom";
    import Signup from "./pages/signup" 
    import Signin from "./pages/signin"
    import { SendMoney } from './pages/SendMoney.jsx'; // Correct import for named export 
    import './App.css';
    import { Dashboard } from "./pages/Dashboard";

    const App = () => {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin/>} />
            <Route path = "/"  element={<Dashboard/>}/>
            <Route path="/send" element={<SendMoney/>} />
          </Routes>
        </BrowserRouter>
      );
    };

    export default App;
