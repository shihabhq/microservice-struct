import mongoose from "mongoose";

const adminAttendanceSchema = mongoose.Schema(
  {
    timelimit: {
      type: Number,
      required: true,
      max: 30,
      min: 1,
      default: 5,
    },
    status: {
      type: String,
      required: true,
      enum: ["RUNNING", "COMPLETED"],
      default: "RUNNING",
    },
  },
  { timestamps: true }
);
const AdminAttendance = mongoose.model(
  "adminAttendance",
  adminAttendanceSchema
);

export default AdminAttendance;
