import { registerService, loginService } from "../service/authservice.js";

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: "Invalid data" });
  }
  try {
    const user = await registerService({ name, email, password });
    res.status(201).json({ msg: "user created successfully", user });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const loggedUserToken = await loginService({ email, password });
    res.status(200).send({ message: "login successfully", loggedUserToken });
  } catch (error) {
    next(error);
  }
};

export { registerController, loginController };
