import { useState } from "react";
import AllRoutes from "./Components/AllRoutes";
import Dialog from "./Components/Dialog";
import NavBar from "./Components/NavBar";
import { Transfer } from "./Components/Transfer";

function App() {
  const [state, setState] = useState(false);
  return (
    <>
      <NavBar />
      <AllRoutes />
    </>
  );
}

export default App;
