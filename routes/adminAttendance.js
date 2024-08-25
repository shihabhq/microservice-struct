import express from "express";

import { getEnable, getDisable, getStatus } from "../controller/adminAttendance.js";

const router = express.Router();

router.get("/enable", getEnable);
router.get("/disable", getDisable);
router.get('/status',getStatus)

export default router;
