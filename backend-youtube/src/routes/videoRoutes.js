// đây là nơi define tất cả routes liên quan tới video

import express from 'express';
import { createVideo } from '../controllers/videoController.js';

// tạo videoRoutes
const videoRoutes = express.Router();
videoRoutes.post("/create-video", createVideo);

export default videoRoutes;