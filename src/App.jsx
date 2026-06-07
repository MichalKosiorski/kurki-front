import { useState } from 'react'
import './App.css'
import { MainMenu } from './menu/menu'
import { Spacer } from './scaffolding/simple-elements'
import { ThemeFooter } from './footer/ThemeFooter'
import HomePage from './pages/home/home'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './utils/scrolltoTop'
import LoginPage from './pages/registration-login/loginPage'
import { AlreadyLoggedInRedirect, RequireAuth } from './utils/loginUtils'
import { AccountPage } from './pages/account/account'
import RegisterPage from './pages/registration-login/registerPage'
import VerifyMailPage from './pages/registration-login/verifyMail'
import { SuccessPage } from './pages/registration-login/successPage'
import { ResetPasswordPage } from './pages/registration-login/resetPasswordPage'

function App() {

  return (
    <div className='app-main'>
      <ScrollToTop/>


      <MainMenu/>
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AlreadyLoggedInRedirect><LoginPage/></AlreadyLoggedInRedirect>} />
        <Route path="/verifyEmail" element={<AlreadyLoggedInRedirect><VerifyMailPage/></AlreadyLoggedInRedirect>} />
        <Route path="/remindPassword" element={<AlreadyLoggedInRedirect><ResetPasswordPage/></AlreadyLoggedInRedirect>} />
        <Route path="/success" element={<AlreadyLoggedInRedirect><SuccessPage/></AlreadyLoggedInRedirect>} />
        <Route path='/account' element={<RequireAuth><AccountPage/></RequireAuth>}/>
        <Route path='/register' element={<AlreadyLoggedInRedirect><RegisterPage/></AlreadyLoggedInRedirect>}/>
      </Routes>
      
      <ThemeFooter />
    </div>
  )
}

export default App
