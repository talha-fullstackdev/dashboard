import React from 'react';
import useTitle from '../hooks/UseTitle';
import { useNavigate } from 'react-router';
const PageNotFound = () => {
  const navigate = useNavigate()
  useTitle("Page Not Found");
  const backHome=()=>{
    navigate(-1)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-6">Oops! Page Not Found</p>
        <p className="text-gray-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <button onClick={backHome}
          className=" cursor-pointer inline-block mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-medium rounded-md transition duration-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;