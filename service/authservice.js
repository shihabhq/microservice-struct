import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByProperty, CreatenewUser } from "./userService.js";
import { error } from "../utils/err.js";
const registerService = async ({ name, email, password }) => {
  const user = await findUserByProperty("email", email);

  if (user) throw error("User already registered")
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(password, saltRounds);
  return CreatenewUser({ name, email, password: hashedPass });
};
const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);
  if (!user) throw error('Invalid Credentials',400)

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw error('Invalid Credentials',400)
  //generate tokens
  const payload = {
    id: user._id,
    name:user.name,
    email:user.email,
    roles:user.roles,
    accountStatus : user.accountStatus,

  }
  const token = jwt.sign(payload, "secretkey");

  return token;
};

export { registerService, loginService };
