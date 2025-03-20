import taskModel from "../models/task.js";
import mongoose from "mongoose";

// Get all tasks for a specific user
export const getUserTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await taskModel.find({ assignedTo: userId }).sort({ dueDate: 1 });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error!", success: false });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, assignedTo } = req.body;
    const newTask = new taskModel({
      title,
      description,
      dueDate,
      assignedTo: assignedTo || req.userId,
    });
    await newTask.save();
    res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error!", success: false });
  }
};

// Update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ msg: "Invalid task ID", success: false });
    }
    
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ msg: "Task not found", success: false });
    }
    
    // Check if the task belongs to the user
    if (task.assignedTo.toString() !== req.userId) {
      return res.status(403).json({ msg: "Unauthorized", success: false });
    }
    
    task.status = status;
    await task.save();
    
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error!", success: false });
  }
}; 