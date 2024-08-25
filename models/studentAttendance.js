import mongoose, { Schema } from "mongoose";

const studentAttendanceSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminAttendance: {
      type: Schema.Types.ObjectId,
      ref: "AdminAttendance",
      required: true,
    },
  },
  { timestamps: true }
);

const StudentAttendance = mongoose.model(
  "studentAttendance",
  studentAttendanceSchema
);

export default StudentAttendance;
