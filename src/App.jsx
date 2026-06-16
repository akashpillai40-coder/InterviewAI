// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const App = () => {
  return (
    <>
     <Navbar />
    <Routes>
      
      <Route path='/' element={<Hero />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
    </>
  )
}

export default App