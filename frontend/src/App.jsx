import {BrowserRouter , Routes, Route} from 'react-router-dom';
import { Signup } from './components/signup';
import { Signin } from './components/Signin';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          {/* <Route path='/dashboard' element={<Dashboard />} /> */}
          {/* <Route path='/send' element={<SendMoney />} /> */}
        </Routes>
      </BrowserRouter>       
    </div>
  )
}

export default App
