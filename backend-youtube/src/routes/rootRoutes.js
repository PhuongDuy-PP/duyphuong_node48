// rootRoutes se tổng hợp tất cả các routes của ứng dụng
// VD: routes của user, product, order,....
// define rootRoutes
import express from 'express';
// lưu ý: khi import thì phải có đuôi .js
import userRoutes from './userRoutes.js';
import videoRoutes from './videoRoutes.js';
import authRouter from './authRouters.js';

const rootRoutes = express.Router();

// import userRoutes vào rootRoutes
// http://localhost:3000/users/.....
rootRoutes.use("/users", userRoutes);
rootRoutes.use("/videos", videoRoutes);
rootRoutes.use("/auth", authRouter)

export default rootRoutes;