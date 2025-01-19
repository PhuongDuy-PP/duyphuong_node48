// define tất cả API dành riêng cho table users
// define userRoutes

import express from 'express';
import { getUsers, createUser } from '../controllers/userController.js';

// tạo userRoutes
const userRoutes = express.Router();

//define API
userRoutes.get("/get-users", getUsers);

//API create-user
userRoutes.post("/create-user", createUser);

// export userRoutes
export default userRoutes;