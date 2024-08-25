import Authroutes from "./auth.js";
import tokenValidator from "../middleware/tokenValidator.js";
import express from "express";
import userRoutes from "./userRoutes.js";
import studentRoutes from "./studentAttendance.js";

import adminTimeSheetRoutes from "./adminAttendance.js";
const router = express.Router();

router.use("/api/v/auth", Authroutes);
router.use("/api/v/users", tokenValidator, userRoutes);
router.use("/api/v/admin/attendance", tokenValidator, adminTimeSheetRoutes);
router.use("/api/v/student/attendance", tokenValidator, studentRoutes);

router.get("/private", tokenValidator, (req, res) => {
  res.status(200).json({ message: "I am private route" });
});

export default router;
