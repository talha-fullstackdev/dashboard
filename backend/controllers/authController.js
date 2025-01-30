
import userModel from "../models/user.js";
import bcrypt from "bcrypt";
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists", success: false });
    }
    // Hash the password properly by awaiting the promise
    const hashedPassword = await bcrypt.hash(password, 10); // Ensure we await the hash operation
    // Create a new user with the hashed password
    const newUser = new userModel({ name, email, password: hashedPassword });
    // Save the new user to the database
    await newUser.save();
    // Send a success response
    res.status(201).json({ msg: "Sign up successful", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error", success: false });
  }
};

export default signUp;
