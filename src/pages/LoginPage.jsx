import React from "react";

import { useState } from "react";
import { loginUser } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //Form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
                 //old formData spread over
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .unwrap()              //unpacks payload from store, pass clean payload to .then
      .then(() => navigate("/dashboard"))
      .catch(() => {});
  };

          
return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
      <p className="text-gray-500 mb-8">Login to your account</p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          {isLoading ? "Logging In..." : "Login"}
        </button>
      </form>
      <p className="text-center text-gray-500 mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 font-medium">
          Register
        </Link>
      </p>
    </div>
  </div>
);
};
export default LoginPage;
