import attendanceModel from "../models/attendance.js";

// Mark check-in for the day
export const checkIn = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Check if already checked in today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const existingAttendance = await attendanceModel.findOne({
      userId,
      date: { $gte: today, $lt: tomorrow }
    });
    
    if (existingAttendance) {
      return res.status(400).json({ 
        msg: "Already checked in today", 
        success: false,
        attendance: existingAttendance 
      });
    }
    
    const checkInTime = new Date();
    const newAttendance = new attendanceModel({
      userId,
      checkIn: checkInTime,
      date: today
    });
    
    await newAttendance.save();
    res.status(201).json({ success: true, attendance: newAttendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error!", success: false });
  }
};

// Mark check-out for the day
export const checkOut = async (req, res) => {
  try {
    const userId = req.userId;
    
    // Find today's attendance record
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const attendance = await attendanceModel.findOne({
      userId,
      date: { $gte: today, $lt: tomorrow }
    });
    
    if (!attendance) {
      return res.status(404).json({ msg: "No check-in record found for today", success: false });
    }
    
    if (attendance.checkOut) {
      return res.status(400).json({ msg: "Already checked out today", success: false });
    }
    
    attendance.checkOut = new Date();
    await attendance.save();
    
    res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error!", success: false });
  }
};

// Get attendance history for a user
export const getAttendanceHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const { month, year } = req.query;
    
    let query = { userId };
    
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      query.date = { $gte: startDate, $lte: endDate };
    }
    
    const attendance = await attendanceModel.find(query).sort({ date: -1 });
    res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error!", success: false });
  }
}; 