
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Fixed import
import useTitle from "../hooks/UseTitle";

const LoginPage = () => {
  useTitle("Login Page");
  const navigate = useNavigate()
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleLogin = async (e) => {
    e.preventDefault();
    const userLoginData = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    const { email, password } = userLoginData;
    if (!email || !password) {
      return alert("Please enter both email and password to login");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLoginData),
      });
      const result = await response.json();
      const { success, message,jwtToken,name, error } = result;
      if (success) {
        alert("login succesful redirecting to home page");
        localStorage.setItem("token",jwtToken)
        localStorage.setItem("loggedInUser",name)

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else if (error) {
        const errorDetails = error?.details[0].message;
        console.log(errorDetails);
      } else if (!success) {
        console.log(message);
      }

      console.log(result);
    } catch (err) {
      console.error(err);
    }


    console.log("Login successful:", userLoginData);

    // Reset fields after successful login
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };
  const goToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        
        <input
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
  );
};

export default LoginPage;
