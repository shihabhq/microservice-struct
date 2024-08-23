import Authrouter from "./auth.js";
import tokenValidator from "../middleware/tokenValidator.js";
import express from "express";
const router = express.Router();

router.use("/api/v", Authrouter);

router.get("/private", tokenValidator, (req, res) => {
  res.status(200).json({ message: "I am private route" });
});

export default router;
