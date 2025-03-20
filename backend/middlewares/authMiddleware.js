import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ 
        message: "Authentication required", 
        success: false 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Extract user ID from token
    const { _id } = decoded;
    
    // Check if user exists
    const user = await userModel.findById(_id);
    if (!user) {
      return res.status(404).json({ 
        message: "User not found", 
        success: false 
      });
    }
    
    // Add user ID to request object
    req.userId = _id;
    
    next();
  } catch (error) {
    console.error(error);
    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ 
        message: "Invalid token", 
        success: false 
      });
    }
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ 
        message: "Token expired", 
        success: false 
      });
    }
    
    res.status(500).json({ 
      message: "Server error", 
      success: false 
    });
  }
}; 