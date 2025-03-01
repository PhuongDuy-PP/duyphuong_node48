// đây là nơi define tất cả routes liên quan tới video

import express from "express";
import { createVideo, createVideoType, deleteVideo, getVideoTypes, listVideo, updateVideo } from "../controllers/videoController.js";
import { middlewareToken } from "../config/jwt.js";

// tạo videoRoutes
const videoRoutes = express.Router();

// ----------video
// CREATE
videoRoutes.post("/create-video", createVideo);

// define API list video
// READ
videoRoutes.get("/list-video", listVideo);

// UPDATE
videoRoutes.put("/update-video/:longdeptraiId", updateVideo)

// DELETE
videoRoutes.delete("/delete-video/:videoId", deleteVideo);

// ----------video-type
// CREATE
videoRoutes.post("/create-video-types", createVideoType);

// define API
// READ
videoRoutes.get("/get-video-types", middlewareToken, getVideoTypes);

export default videoRoutes;
