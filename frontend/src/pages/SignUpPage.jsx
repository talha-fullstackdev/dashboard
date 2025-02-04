import React, { useRef } from "react";
import useTitle from "../hooks/UseTitle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SignUpUIComponent from "../components/SignUpUIComponent";
const SignUpPage = () => {
  useTitle("Signup Page");
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
      return
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
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        toast.success("signup succesfull redirecting to login page");
        nameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";
      } else if (error) {
        const errorDetails = error?.details[0].message;
        toast.error(errorDetails);
      } else if (!success) {
        toast.error(message);
        console.log(message);
        nameRef.current.value = "";
        emailRef.current.value = "";
        passwordRef.current.value = "";

      }
    } catch (err) {
      console.error(err);
    }
  };

  const properties = {
    handleSignup,
    nameRef,
    emailRef,
    passwordRef,
  };

  return <SignUpUIComponent properties={properties} />;
};

export default SignUpPage;
