import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const tokenValidator = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, "secretkey");

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Token verification failed",
    });
  }
};

export default tokenValidator;
