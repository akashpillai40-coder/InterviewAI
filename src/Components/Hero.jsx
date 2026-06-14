// src/components/Hero.jsx
import React from "react"

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-20 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">
        Practice interviews with AI
      </h1>
      <p className="text-gray-500 text-lg mb-8">
        Get instant feedback and improve your interview skills
      </p>
      <button className="px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition">
        Get Started
      </button>
    </div>
  )
}

export default Hero