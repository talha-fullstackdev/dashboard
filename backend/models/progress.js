import mongoose from "mongoose";
const Schema = mongoose.Schema;

const progressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  tasksCompleted: {
    type: Number,
    default: 0,
  },
  attendancePercentage: {
    type: Number,
    default: 0,
  },
  performance: {
    type: Number, // 1-5 rating
    default: 3,
  },
  notes: {
    type: String,
    default: "",
  },
});

// Compound index to ensure unique monthly progress per user
progressSchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

const progressModel = mongoose.model("progress", progressSchema);
export default progressModel; 