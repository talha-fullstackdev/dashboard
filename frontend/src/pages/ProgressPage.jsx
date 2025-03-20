import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import useTitle from "../hooks/UseTitle";
import axios from "axios";

const ProgressPage = () => {
  useTitle("Progress Dashboard");
  const [progressHistory, setProgressHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgressHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          "http://localhost:8080/dashboard/progress/history",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProgressHistory(response.data.progress || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching progress history:", err);
        setError(err.message || "Failed to load progress history");
        setLoading(false);
      }
    };

    fetchProgressHistory();
  }, []);

  const getMonthName = (monthNumber) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[monthNumber - 1];
  };

  const getProgressColor = (value) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-blue-500";
    if (value >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
        
        {halfStar && (
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="halfGradient">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <path fill="url(#halfGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        )}
        
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold mb-6">Performance Progress</h2>

      {progressHistory.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl text-gray-500">No progress data available yet</h3>
          <p className="text-gray-400 mt-2">Data will be generated as you complete tasks and mark attendance</p>
        </div>
      ) : (
        <>
          {/* Performance Overview */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Latest Performance */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Latest Performance</h4>
                <div className="flex items-center">
                  {getRatingStars(progressHistory[0]?.performance || 0)}
                  <span className="ml-2 text-xl font-bold">
                    {progressHistory[0]?.performance?.toFixed(1) || "N/A"}
                  </span>
                </div>
              </div>
              
              {/* Tasks Completed */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Tasks Completed ({getMonthName(progressHistory[0]?.month)})
                </h4>
                <p className="text-xl font-bold">{progressHistory[0]?.tasksCompleted || 0}</p>
              </div>
              
              {/* Average Attendance */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Attendance Rate ({getMonthName(progressHistory[0]?.month)})
                </h4>
                <p className="text-xl font-bold">{progressHistory[0]?.attendancePercentage?.toFixed(1) || 0}%</p>
              </div>
            </div>
          </div>

          {/* Monthly Progress */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Progress</h3>

            <div className="space-y-6">
              {progressHistory.map((progress) => (
                <div key={`${progress.month}-${progress.year}`} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">
                    {getMonthName(progress.month)} {progress.year}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Performance Rating</p>
                      <div className="flex items-center">
                        {getRatingStars(progress.performance)}
                        <span className="ml-2">{progress.performance.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Tasks Completed</p>
                      <p className="font-semibold">{progress.tasksCompleted}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Attendance</p>
                      <p className="font-semibold">{progress.attendancePercentage.toFixed(1)}%</p>
                    </div>
                  </div>
                  
                  {/* Progress Bars */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">Attendance</span>
                        <span className="text-xs text-gray-500">{progress.attendancePercentage.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-full rounded-full ${getProgressColor(progress.attendancePercentage)}`} 
                          style={{ width: `${progress.attendancePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">Performance</span>
                        <span className="text-xs text-gray-500">{(progress.performance / 5 * 100).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-full rounded-full ${getProgressColor(progress.performance / 5 * 100)}`} 
                          style={{ width: `${progress.performance / 5 * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {progress.notes && (
                    <div className="mt-3 text-sm text-gray-500">
                      <p><span className="font-medium">Notes:</span> {progress.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default ProgressPage; 