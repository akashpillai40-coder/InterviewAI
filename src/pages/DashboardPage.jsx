// src/pages/Dashboard.jsx
import { useSelector, useDispatch } from 'react-redux'
import { logout, getMe } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import HistoryPage from './HistoryPage'


const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  useEffect(() => {
    if (!user) {
      dispatch(getMe())
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user?.name || 'User'}
        </h1>
        <button
          onClick={handleLogout}
          className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Start a new interview</h2>
        <button 
       onClick={() => navigate('/interview/new')}
        className="px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer">
          New Interview
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Previous Interviews</h2>
        <button 
       onClick={() => navigate('/interview/history')}
        className="px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 cursor-pointer">
          History
        </button>
      </div>


    </div>
  )
}

export default DashboardPage