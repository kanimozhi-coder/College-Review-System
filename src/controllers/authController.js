import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

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

    return res.status(201).json({
      message: "user registration successfully",
      createUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginHandler = async function (req, res) {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (!existingUser) {
      return res.status(403).json({
        message: "please register first",
      });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        message: "invalid email or password",
      });
    }

    const token = jwt.sign({ userId: existingUser._id, role: existingUser.role }, process.env.JWT_SECRETKEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "login success",
    });
    // console.log("isPasswordValid", isPasswordValid);
  } catch (error) {
    console.log(error);
  }
};

export const logoutHandler = async (req, res) => {
  try {
    res.clearCookie("token");

    res.json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
