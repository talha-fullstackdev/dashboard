import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getUserTasks, createTask, updateTaskStatus } from "../controllers/taskController.js";
import { checkIn, checkOut, getAttendanceHistory } from "../controllers/attendanceController.js";
import { getMonthlyProgress, getProgressHistory } from "../controllers/progressController.js";

const router = express.Router();

// Protect all dashboard routes with auth middleware
router.use(authMiddleware);

// Task routes
router.get("/tasks", getUserTasks);
router.post("/tasks", createTask);
router.patch("/tasks/status", updateTaskStatus);

// Attendance routes
router.post("/attendance/check-in", checkIn);
router.post("/attendance/check-out", checkOut);
router.get("/attendance/history", getAttendanceHistory);

// Progress routes
router.get("/progress/monthly", getMonthlyProgress);
router.get("/progress/history", getProgressHistory);

export default router; 