import { useState } from 'react'
import './App.css'
import { MainMenu } from './menu/menu'
import { Spacer } from './scaffolding/simple-elements'
import { ThemeFooter } from './footer/ThemeFooter'
import HomePage from './pages/home/home'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './utils/scrolltoTop'
import LoginPage from './pages/registration-login/loginPage'

function App() {

  return (
    <div className='app-main'>
      <ScrollToTop/>


      <MainMenu/>
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      
      <ThemeFooter />
    </div>
  )
}

export default App
