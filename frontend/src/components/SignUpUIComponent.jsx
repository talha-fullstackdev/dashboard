import React from "react";
import { Link } from "react-router";
const SignUpUIComponent = ({ properties }) => {
  const { handleSignup, nameRef, emailRef, passwordRef } = properties;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

        <input
          autoFocus
          ref={nameRef}
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          ref={emailRef}
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
          Sign Up
        </button>

        <span className="block text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignUpUIComponent;
