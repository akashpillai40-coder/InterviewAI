import React from "react";


import { useState } from "react";
import { registerUser } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    fName: "",
    lastName: "",
    email: "",
    password: "",
  });
  //upDate form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //Form submit and payload from store
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => navigateTo("/dashboard")) //navigate to Dashboard
      .catch(() => {});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Create account
        </h2>
        <p className="text-gray-500 mb-8">Start your AI interview journey</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="First Name"
            name="fName"
            value={formData.fName}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="abc@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
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
            {isLoading ? "Creating account" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
