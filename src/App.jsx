// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ProtectedRoute from './routes/ProtectedRoute'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'

import Guide from './components/Guide'


const App = () => {
  return (
    <>
                <Navbar />
    <Routes>
      
      <Route path='/' element={<LandingPage />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
    </Routes>
    </>
  )
}

export default App