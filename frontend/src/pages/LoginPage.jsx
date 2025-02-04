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
      return;
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
        setTimeout(() => {
          navigate("/home");
        }, 2000);
        toast.success("login succes redirecting to home page");
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        emailRef.current.value = ""; // Reset fields after successful login
        passwordRef.current.value = "";
      } else if (error) {
        const errorDetails = error?.details[0].message;
        toast.error(errorDetails);
        return;
      } else if (!success) {
        toast.error(message);
        emailRef.current.value = ""; // Reset fields after successful login
        passwordRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
    }
  };
  const goToSignUp = () => {
    navigate("/signup");
  };
  const properties = {
    handleLogin,
    goToSignUp,
    emailRef,
    passwordRef,
  };

  return <LoginUIComponent properties={properties} />;
};

export default LoginPage;
