import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import useTitle from "../hooks/UseTitle";
import axios from "axios";
import { toast } from "react-toastify";

const TasksPage = () => {
  useTitle("Tasks Dashboard");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTaskForm, setNewTaskForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get("http://localhost:8080/dashboard/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(response.data.tasks || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.message || "Failed to load tasks");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTaskForm({ ...newTaskForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.post(
        "http://localhost:8080/dashboard/tasks",
        newTaskForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Reset form and fetch updated tasks
      setNewTaskForm({ title: "", description: "", dueDate: "" });
      setShowForm(false);
      toast.success("Task created successfully");
      fetchTasks();
    } catch (err) {
      console.error("Error creating task:", err);
      toast.error(err.response?.data?.msg || "Failed to create task");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.patch(
        "http://localhost:8080/dashboard/tasks/status",
        { taskId, status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local task state
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
      
      toast.success(`Task marked as ${newStatus}`);
    } catch (err) {
      console.error("Error updating task status:", err);
      toast.error(err.response?.data?.msg || "Failed to update task status");
    }
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Tasks</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          {showForm ? "Cancel" : "New Task"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newTaskForm.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={newTaskForm.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={newTaskForm.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-xl text-gray-500">No tasks found</h3>
          <p className="text-gray-400 mt-2">Create a new task to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${
                task.status === "completed"
                  ? "border-green-500"
                  : task.status === "in-progress"
                  ? "border-yellow-500"
                  : "border-blue-500"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : task.status === "in-progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{task.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  {task.status !== "in-progress" && (
                    <button
                      onClick={() => handleStatusChange(task._id, "in-progress")}
                      className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                    >
                      In Progress
                    </button>
                  )}
                  {task.status !== "completed" && (
                    <button
                      onClick={() => handleStatusChange(task._id, "completed")}
                      className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default TasksPage; 