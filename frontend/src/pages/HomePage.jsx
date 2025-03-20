import { useEffect } from "react";
import useTitle from "../hooks/UseTitle";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to dashboard after login
    navigate("/dashboard");
  }, [navigate]);
  
  useTitle("Redirecting to Dashboard");
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl mb-4 font-bold">Redirecting to Dashboard...</h1>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    </div>
  );
};

export default HomePage;
