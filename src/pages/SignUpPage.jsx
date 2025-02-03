import React, { useRef } from "react";
import { Link } from "react-router-dom";
import useTitle from "../hooks/UseTitle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SignUpPage = () => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleSignup = async (e) => {
    e.preventDefault();

    let userSignupData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const { name, email, password } = userSignupData;
    if (!name || !email || !password) {
      toast.error("Please fill all the fields");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userSignupData),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        toast.success("signup succesfull redirecting to login page");
        setTimeout(() => {
          navigate("/login");
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
    console.log("Signup successful:", userSignupData);
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  useTitle("Signup Page");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

        <input
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

export default SignUpPage;
