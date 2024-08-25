import { registerService } from "../service/authservice.js";
import {
  CreateNewUser,
  findUserByProperty,
  findUsers,
  updateUser,
} from "../service/userService.js";
import { error } from "../utils/err.js";

const getUsers = async (req, res, next) => {
  //TODO: filter,sort, select, pagination
  try {
    const users = await findUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
const createUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;

  try {
    const user = await registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
const getUserById = async (req, res, next) => {
  const userId = req.params.userid;

  if (!userId) {
    throw error("no userId provided", 400);
  }
  try {
    const user = await findUserByProperty("_id", userId);
    if (!user) throw error("user not found", 404);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const putUserById = async (req, res, next) => {
  const { userid } = req.params;
  const { name, email, roles, accountStatus } = req.body;

  try {
    const user = await updateUser(userid, {
      name,
      roles,
      email,
      accountStatus,
    });

    if (!user) throw error("user not found", 404);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const patchUseById = async (req, res, next) => {
  const { userid } = req.params;
  const { name, roles, accountStatus } = req.body;

  try {
    const user = await findUserByProperty("_id", userid);
    if (!user) throw error("user not found", 404);

    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;

    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const deleteUserById = async (req, res, next) => {
  const userId = req.params.userid;

  if (!userId) {
    throw error("no userId provided", 400);
  }

  try {
    const user = await findUserByProperty("_id", userId);
    if (!user) throw error("user not found", 404);

    await user.deleteOne(); //this is the problem
    return res.status(203).json(user);
  } catch (error) {
    next(error);
  }
};

export {
  getUserById,
  getUsers,
  createUser,
  putUserById,
  patchUseById,
  deleteUserById,
};
