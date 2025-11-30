import React from 'react'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import SignupForm from './components/SignUp'
import SignInForm from './components/Signin'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'

const App = () => {
  return (
    // <div>
    //   <header>
    //     <Navbar />
    //   </header>

    //   <main>
    //     <LandingPage />
    //     <SignupForm />
    //     <SignInForm />
    //   </main>
    // </div>

    <BrowserRouter>
      <Navbar /> {/* always visible */}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/signin' element={<SignInForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App