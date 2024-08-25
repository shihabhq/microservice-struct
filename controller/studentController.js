import AdminAttendance from "../models/adminAttendance.js";
import StudentAttendance from "../models/studentAttendance.js";
import { addMinutes, isAfter } from "date-fns";
import { error } from "../utils/err.js";

const getAttendance = async (req, res, next) => {
  const { id } = req.params;
  try {
    /**
     * step 1 - Find admin attendance by id
     * step 2 - check if it is running or not
     * step 3 - look user is already registered or not
     * setp 4 - if registered then get out
     * step 3 - if not registered then register entry
     */
    const adminAttendance = await AdminAttendance.findById(id);
    if (!adminAttendance) throw error("invalid Attendance id", 400);
    if (adminAttendance.status !== "RUNNING")
      throw error("Attendance already completed");

    let attendance = await StudentAttendance.findOne({
      adminAttendance: id,
      user: req.user._id,
    });
    if (attendance) throw error("already registered", 400);

    attendance = new StudentAttendance({
      user: req.user._id,
      adminAttendance: id,
    });

    await attendance.save();
    return res.status(201).json(attendance);
  } catch (error) {
    next(error);
  }
};

const getAttendanceStatus = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (!running) throw error("Not Running", 400);

    const started = addMinutes(new Date(running.createdAt), running.timelimit);

    if (isAfter(new Date(), started)) {
      running.status = "COMPLETED";
      await running.save();
    }

    return res.status(200).json(running);
  } catch (error) {
    next(error);
  }
};

export { getAttendance, getAttendanceStatus };
