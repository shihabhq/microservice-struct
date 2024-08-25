import express from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  patchUseById,
  putUserById,
} from "../controller/userController.js";

const router = express.Router();

/**
 * get user by Id or email
 */
router.get("/:userid", getUserById);

/**
 * update an user info
 */
router.patch("/:userid", patchUseById);

/**
 * update multiple user info
 */
router.put("/:userid", putUserById);

/**
 * delete an user
 */
router.delete("/:userid", deleteUserById);

/**
 * Get all users, include
 * - filter
 * - sort
 * - pagination
 * - select properties
 *
 * @route api/users
 * @method GET
 * @visibility Private
 */

router.get("/", getUsers);
/**
 * Create new user
 */
router.post("/", createUser);

export default router;
