import progressModel from "../models/progress.js";
import attendanceModel from "../models/attendance.js";
import taskModel from "../models/task.js";
import mongoose from "mongoose";

// Get progress data for a specific month and year
export const getMonthlyProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const { month, year } = req.query;
    
    if (!month || !year) {
      return res.status(400).json({ 
        msg: "Month and year are required", 
        success: false 
      });
    }
    
    let progress = await progressModel.findOne({
      userId,
      month: parseInt(month),
      year: parseInt(year)
    });
    
    if (!progress) {
      // Create new progress entry if it doesn't exist
      progress = await calculateAndSaveProgress(userId, parseInt(month), parseInt(year));
    }
    
    res.status(200).json({ success: true, progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error!", success: false });
  }
};

// Get progress history (last 6 months)
export const getProgressHistory = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Get current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    // Calculate last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 5);
    const startMonth = sixMonthsAgo.getMonth() + 1;
    const startYear = sixMonthsAgo.getFullYear();
    
    // Query for progress data
    const progress = await progressModel.find({
      userId,
      $or: [
        { year: { $gt: startYear } },
        { year: startYear, month: { $gte: startMonth } }
      ]
    }).sort({ year: 1, month: 1 });
    
    res.status(200).json({ success: true, progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error!", success: false });
  }
};

// Helper function to calculate and save progress
const calculateAndSaveProgress = async (userId, month, year) => {
  try {
    // Calculate date range for the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    
    // Get attendance records for the month
    const attendanceRecords = await attendanceModel.find({
      userId,
      date: { $gte: startDate, $lte: endDate }
    });
    
    // Calculate attendance percentage
    const daysInMonth = endDate.getDate();
    const attendancePercentage = (attendanceRecords.length / daysInMonth) * 100;
    
    // Count completed tasks for the month
    const completedTasks = await taskModel.countDocuments({
      assignedTo: userId,
      status: "completed",
      dueDate: { $gte: startDate, $lte: endDate }
    });
    
    // Create new progress record
    const newProgress = new progressModel({
      userId,
      month,
      year,
      tasksCompleted: completedTasks,
      attendancePercentage,
      performance: calculatePerformance(attendancePercentage, completedTasks),
      notes: `Auto-generated for ${month}/${year}`
    });
    
    await newProgress.save();
    return newProgress;
  } catch (error) {
    console.error("Error calculating progress:", error);
    throw error;
  }
};

// Helper function to calculate performance rating (1-5)
const calculatePerformance = (attendancePercentage, tasksCompleted) => {
  // Simple formula: base on attendance percentage and tasks completed
  const attendanceScore = Math.min(attendancePercentage / 20, 5); // Max 5 points
  const taskScore = Math.min(tasksCompleted / 2, 5); // Max 5 points for 10+ tasks
  
  // Average of the two scores
  const performance = (attendanceScore + taskScore) / 2;
  
  // Round to nearest 0.5
  return Math.round(performance * 2) / 2;
}; 