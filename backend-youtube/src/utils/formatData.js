import dotenv from 'dotenv';

dotenv.config();

export const formatVideoList = (listVideos) => {

    return listVideos.map((video) => {
        const videoData = typeof video.toJSON === "function" ? video.toJSON() : video;
        return {
            videoData,
            thumbnail: `${process.env.BASE_URL}/public/images/${video.thumbnail}`,
            source: `${process.env.BASE_URL}/public/videos/${video.source}`
        }
    });
}