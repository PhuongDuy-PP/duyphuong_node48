// đây là nơi define tất cả routes liên quan tới video

import express from 'express';
import { createVideo, getVideoTypes, listVideo } from '../controllers/videoController.js';

// tạo videoRoutes
const videoRoutes = express.Router();
videoRoutes.post("/create-video", createVideo);

// define API list video
videoRoutes.get("/list-video", listVideo);

// define API
videoRoutes.get("/get-video-types", getVideoTypes); 

export default videoRoutes;