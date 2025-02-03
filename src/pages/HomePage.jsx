import React, { useEffect, useState } from "react";
import useTitle from "../hooks/UseTitle";
import { Link } from "react-router";
const HomePage = () => {
  useTitle("Home Page");
  const [loginUser, setLoginUser] = useState("");
  useEffect(() => {
    setLoginUser(localStorage.getItem("loggedInUser"));
  });
  return (
    <div>
      <h1 className="text-4xl mb-4 font-bold">
        Welcome to home page {loginUser}
      </h1>
      <Link
        className="ml-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white px-2 py-1 "
        to="/login"
      >
        logout
      </Link>
    </div>
  );
};

export default HomePage;
