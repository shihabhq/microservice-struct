import User from "../models/userSchema.js";
import { error } from "../utils/err.js";

const findUsers = () => {
  return User.find();
};

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

const CreateNewUser = ({ name, email, password, roles, accountStatus }) => {
  const newUser = new User({
    name,
    email,
    password,
    roles: roles ? roles : ["Student"],
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });
  return newUser.save();
};

const updateUser = async (id, data) => {
  const user = await findUserByProperty("email", data.email);
  if (user) throw error("user with this email already exists", 400);
  
  return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

export { findUserByProperty, CreateNewUser, findUsers, updateUser };
