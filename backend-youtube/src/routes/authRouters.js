import express from "express";
import { register } from "../controllers/authController.js";

const authRouter = express.Router();

// Đăng ký
authRouter.post("/register", register);

// Đăng nhập

export default authRouter;
