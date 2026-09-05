import { decrypt } from "dotenv";
import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";

export const registerHandler = async function (req, res) {
  try {
    const existingUser = await UserModel.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      return res.status(403).json({
        success: false,
        message: "user already exists, please login",
      });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    console.log("hashPassword", hashPassword);

    const createUser = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      role: req.body.role,
    });

    res.status(201).json({
      message: "user registration successfully",
      createUser,
    });
  } catch (error) {
    console.log(error);
  }
};
