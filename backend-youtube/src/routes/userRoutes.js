// define tất cả API dành riêng cho table users
// define userRoutes

import express from 'express';
import { getUsers, createUser, uploadAvatar } from '../controllers/userController.js';
import { middlewareToken } from '../config/jwt.js';
import { upload } from '../config/upload.js';

// tạo userRoutes
const userRoutes = express.Router();

//define API
userRoutes.get("/get-users", getUsers);

//API create-user
userRoutes.post("/create-user", middlewareToken , createUser);

// API upload avatar
userRoutes.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

// export userRoutes
export default userRoutes;