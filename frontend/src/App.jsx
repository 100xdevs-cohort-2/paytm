
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { SignupPage } from './pages/signup-page'
import { SigninPage } from './pages/signin-page'
import { Dashboard } from './pages/dashboard'
import { Send } from './pages/send-money'
import { Default } from './pages/default'

function App() {


  return (
   <div className='bg-zinc-50 w-screen h-screen'>
    <BrowserRouter>
   <Routes>

    <Route path='/signup' element={<SignupPage/>} />
    <Route path='/signin' element={<SigninPage/>} />
    <Route path='/dashboard' element={<Dashboard/>} />
    <Route path='/send' element={<Send/>} />
    <Route path='*' element={<Default/>} />

   </Routes>
   </BrowserRouter>
   </div>
  )
}

export default App
