import AdminAttendance from "../models/adminAttendance.js";
import { error } from "../utils/err.js";
import { addMinutes, isAfter } from "date-fns";

const getEnable = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (running) throw error("Already running", 400);
    const attendance = new AdminAttendance();

    await attendance.save();
    return res.status(201).json({ message: "success", attendance });
  } catch (error) {
    next(error);
  }
};
const getStatus = async (req, res, next) => {
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

const getDisable = async (req, res, next) => {
  try {
    const running = await AdminAttendance.findOne({ status: "RUNNING" });
    if (!running) throw error("Not Running", 400);

    running.status = "COMPLETED";
    await running.save();

    return res.status(200).json(running)
  } catch (error) {
    next(error);
  }
};

export { getEnable, getDisable, getStatus };
