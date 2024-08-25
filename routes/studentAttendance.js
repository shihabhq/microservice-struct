import { getAttendance,getAttendanceStatus } from '../controller/studentController.js';
import express from 'express';

const router = express.Router();

router.get('/status',getAttendanceStatus)
router.get('/:id',getAttendance)


export default router;
