import React, { useEffect, useState } from "react";
import useTitle from "../hooks/UseTitle";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
const HomePage = () => {
  const navigate = useNavigate();
  useTitle("Home Page");
  const [loginUser, setLoginUser] = useState("");
  useEffect(() => {
    setLoginUser(localStorage.getItem("loggedInUser"));
  }, []);
  const handleLogout = () => {
    toast.error("logout");
    setTimeout(()=>{
      navigate("/login")
    },2000)
  };
  return (
    <div>
      <h1 className="text-4xl mb-4 font-bold">
        Welcome to home page {loginUser}
      </h1>
      <button
      title="logout?"
        onClick={handleLogout}
        className="cursor-pointer ml-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white px-2 py-1 "
      >
        logout
      </button>
    </div>
  );
};

export default HomePage;
