import React from 'react';
import { useNavigate } from 'react-router';
import useTitle from '../components/UseTitle';
const LoginPage = () => {
  useTitle("login page")
  const navigate = useNavigate()
  const goToSignUp=()=>{
    navigate("/signup")
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <input
          type="email" // Corrected to type="email"
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password" // Changed to type="password" for security
          placeholder="Enter your password"
          required
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className=" cursor-pointer w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
          Login
        </button>
        <button onClick={goToSignUp} className="mt-2 cursor-pointer w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
          signup
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
