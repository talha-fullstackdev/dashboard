import userModel from "../models/user.js";
import bcrypt from "bcrypt";
const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ msg: "Sign up successful", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error", success: false });
  }
};

export default signUp;
