import React from 'react'
const LoginPageUI = ({properties}) => {
    const {   handleLogin,goToSignUp,emailRef,passwordRef} = properties
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <form
      onSubmit={handleLogin}
      className="bg-white p-8 rounded-lg shadow-md w-96"
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      <input
        autoFocus
        ref={emailRef}
        type="email"
        placeholder="Enter your email"
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        ref={passwordRef}
        type="password"
        placeholder="Enter your password"
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
        Login
      </button>

      <button
        type="button" // Added type="button" to prevent form submission
        onClick={goToSignUp}
        className="mt-2 cursor-pointer w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Create Account
      </button>
    </form>
  </div>
  )
}

export default LoginPageUI