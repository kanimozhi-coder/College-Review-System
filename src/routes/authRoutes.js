import express from "express";
import { loginHandler, logoutHandler, registerHandler } from "../controllers/authController.js";
import validate from "../config/authValidation.js";

const route = express.Router();

route.post("/register", validate.validateRegister, registerHandler);
route.post("/login", validate.validateLogin, loginHandler);
route.get("/logout", logoutHandler);

export default route;
