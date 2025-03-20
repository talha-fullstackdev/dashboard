import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import useTitle from "../hooks/UseTitle";
import axios from "axios";
import { toast } from "react-toastify";

const AttendancePage = () => {
  useTitle("Attendance Dashboard");
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchAttendanceHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(
        `http://localhost:8080/dashboard/attendance/history?month=${selectedMonth}&year=${selectedYear}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const attendanceData = response.data.attendance || [];
      setAttendanceHistory(attendanceData);

      // Check if there's an attendance record for today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayRecord = attendanceData.find((record) => {
        const recordDate = new Date(record.date);
        recordDate.setHours(0, 0, 0, 0);
        return recordDate.getTime() === today.getTime();
      });
      
      setTodayAttendance(todayRecord || null);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching attendance history:", err);
      setError(err.message || "Failed to load attendance history");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceHistory();
  }, [selectedMonth, selectedYear]);

  const handleCheckIn = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(
        "http://localhost:8080/dashboard/attendance/check-in",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTodayAttendance(response.data.attendance);
      toast.success("Check-in recorded successfully");
      fetchAttendanceHistory();
    } catch (err) {
      console.error("Error checking in:", err);
      toast.error(err.response?.data?.msg || "Failed to check in");
    }
  };

  const handleCheckOut = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(
        "http://localhost:8080/dashboard/attendance/check-out",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTodayAttendance(response.data.attendance);
      toast.success("Check-out recorded successfully");
      fetchAttendanceHistory();
    } catch (err) {
      console.error("Error checking out:", err);
      toast.error(err.response?.data?.msg || "Failed to check out");
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    
    // Get hours (0-23)
    let hours = date.getHours();
    
    // Convert to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    // Get minutes and pad with leading zero if needed
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}${ampm}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    
    // Get month (1-12), day, and year
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${month}/${day}/${year}`;
  };

  // Generate month options for the filter
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  // Generate year options (current year and previous years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, i) => currentYear - i);

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
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Attendance Tracker</h2>
        <div className="bg-blue-50 px-4 py-2 rounded-lg text-blue-700 font-medium">
          <p>{formatDate(currentDateTime)} | {formatTime(currentDateTime)}</p>
        </div>
      </div>
      
      {/* Today&apos;s Attendance Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Today&apos;s Attendance</h3>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">
              <span className="font-medium">Status:</span>{" "}
              {todayAttendance ? (
                <span className="text-green-600 font-semibold">Present</span>
              ) : (
                <span className="text-yellow-600 font-semibold">Not Marked</span>
              )}
            </p>
            {todayAttendance && (
              <>
                <p className="text-gray-600 mt-2">
                  <span className="font-medium">Check-in Time:</span>{" "}
                  {formatTime(todayAttendance.checkIn)}
                </p>
                <p className="text-gray-600 mt-2">
                  <span className="font-medium">Check-out Time:</span>{" "}
                  {formatTime(todayAttendance.checkOut)}
                </p>
              </>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleCheckIn}
              disabled={todayAttendance !== null}
              className={`px-4 py-2 rounded-lg ${
                todayAttendance
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
              }`}
            >
              Check In
            </button>
            <button
              onClick={handleCheckOut}
              disabled={!todayAttendance || todayAttendance.checkOut}
              className={`px-4 py-2 rounded-lg ${
                !todayAttendance || todayAttendance.checkOut
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white cursor-pointer "
              }`}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h3 className="text-lg font-semibold mb-2 md:mb-0">Attendance History</h3>
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="mb-2 sm:mb-0">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {attendanceHistory.length === 0 ? (
          <div className="bg-gray-50 p-6 text-center rounded-lg">
            <p className="text-gray-500">No attendance records found for this month</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">User</th>
                  <th className="py-3 px-6 text-left">Check In</th>
                  <th className="py-3 px-6 text-left">Check Out</th>
                  <th className="py-3 px-6 text-left">Duration</th>
                  <th className="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {attendanceHistory.map((record) => {
                  const checkInTime = new Date(record.checkIn);
                  const checkOutTime = record.checkOut ? new Date(record.checkOut) : null;
                  
                  // Calculate duration
                  let duration = "N/A";
                  if (checkOutTime) {
                    const durationMs = checkOutTime - checkInTime;
                    const hours = Math.floor(durationMs / (1000 * 60 * 60));
                    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
                    duration = `${hours}h ${minutes}m`;
                  }
                  
                  return (
                    <tr key={record._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 text-left">
                        {formatDate(record.date)}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {record.username || "Unknown"}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {formatTime(record.checkIn)}
                      </td>
                      <td className="py-3 px-6 text-left">
                        {formatTime(record.checkOut)}
                      </td>
                      <td className="py-3 px-6 text-left">{duration}</td>
                      <td className="py-3 px-6 text-left">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AttendancePage; 