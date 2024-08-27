import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {Signin} from './pages/Signin';
import {Signup} from './pages/Signupp';
import {Dashboard }from './pages/Dashboard';
import {SendMoney }from './pages/SendMoney';
function App() {

  return (
    <div>
      <BrowserRouter>
       <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/send" element={<SendMoney/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
