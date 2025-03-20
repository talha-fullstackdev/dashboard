import mongoose from "mongoose";
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  username: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["present", "absent", "half-day"],
    default: "present",
  },
});

const attendanceModel = mongoose.model("attendance", attendanceSchema);
export default attendanceModel; 