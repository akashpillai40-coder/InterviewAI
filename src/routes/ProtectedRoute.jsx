// src/routes/ProtectedRoute.jsx
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth)
  const { isAuthenticated } = useSelector((state) => state.auth)

  if (!token) {
    return <Navigate to="/login" replace />
  }
  
  return children //render whatever inside <Protected Route /> in App.jsx
}

export default ProtectedRoute