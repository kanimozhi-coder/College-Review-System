import express from "express";
import { registerHandler } from "../controllers/authController.js";
import validate from "../config/authValidation.js";

const route = express.Router();

route.post("/register", validate.validateRegister, registerHandler);

export default route;
