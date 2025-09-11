import { AuthModel } from "../model/AuthModel.js";
import jwt from "jsonwebtoken";

//register User
export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const user = await AuthModel.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "email is already registered" });
    }
    const registerData = await AuthModel.create({
      userName,
      email,
      password,
    });
    if (registerData) res.status(200).send({ message: "user registered successfully", registerData });
    return res.status(400).send({ message: "failed to register user" });
  } catch (error) {
    console.log("error", error);
  }
};

//login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthModel.findOne({
      email,
      password,
    });
    if (user) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_TOKEN);
      res.status(200).json({
        message: "login successfull",
        email: user.email,
        userName: user.userName,
        token,
        userId: user._id,
      });
    } else res.status(400).send({ messgae: "Invalid email Password" });
  } catch (error) {
    console.log("error", error);
  }
};
