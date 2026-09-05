import express from "express";
import { loginHandler, registerHandler } from "../controllers/authController.js";
import validate from "../config/authValidation.js";

const route = express.Router();

route.post("/register", validate.validateRegister, registerHandler);
route.post("/login", validate.validateLogin, loginHandler);

export default route;
