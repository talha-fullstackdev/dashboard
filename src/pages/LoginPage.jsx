import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Fixed import
import useTitle from "../hooks/UseTitle";
import { toast } from "react-toastify";
import LoginUIComponent from "../components/LoginUIComponent";
const LoginPage = () => {
  useTitle("Login Page");
  const navigate = useNavigate();
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
      toast.error("Please enter both email and password to login");
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
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        toast.success("login succes redirecting to home page");
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else if (error) {
        const errorDetails = error?.details[0].message;
        toast.error(errorDetails);
        return;
      } else if (!success) {
        toast.error(message);
      }
    } catch (err) {
      console.error(err);
    }

    // Reset fields after successful login
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };
  const goToSignUp = () => {
    navigate("/signup");
  };
  const properties = { // properties to pass to child component
    handleLogin,
    goToSignUp,
    emailRef,
    passwordRef

  }

  return (
    <LoginUIComponent properties={properties} />
  );
};

export default LoginPage;
