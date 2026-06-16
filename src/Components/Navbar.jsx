import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
            AI
          </div>
          <h1 className="text-3xl font-bold text-gray-900">InterviewAI</h1>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-12 text-gray-600 font-medium">
          <a href="#" className="hover:text-blue-600 transition">
            Features
          </a>

          <a href="#" className="hover:text-blue-600 transition">
            How It Works
          </a>

          <a href="#" className="hover:text-blue-600 transition">
            Testimonials
          </a>

          <Link to="/login" className="hover:text-blue-600 transition">
            Sign In
          </Link>
          <Link to="/register">
            <button className="px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
