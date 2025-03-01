// define tất cả API dành riêng cho table users
// define userRoutes

import express from 'express';
import { getUsers, createUser, uploadAvatar, uploadMultipleImgs, uploadAvatarCloud, getUserProfile } from '../controllers/userController.js';
import { middlewareToken } from '../config/jwt.js';
import { upload } from '../config/upload.js';
import { uploadCloud } from '../config/upload.cloud.js';

// tạo userRoutes
const userRoutes = express.Router();

//define API
userRoutes.get("/get-users", getUsers);

//API create-user
userRoutes.post("/create-user", middlewareToken , createUser);

// API upload avatar
userRoutes.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

// API upload multiple images
userRoutes.post("/upload-multiple-imgs", upload.array("images"), uploadMultipleImgs);

// API upload avatar to cloudinary
userRoutes.post("/upload-avatar-cloud", uploadCloud.single("avatar"), uploadAvatarCloud);

// API upload multiple images to cloudinary

// API get user profile
userRoutes.get("/get-user-profile", middlewareToken, getUserProfile);

// export userRoutes
export default userRoutes;