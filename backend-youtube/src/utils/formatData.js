import dotenv from 'dotenv';

dotenv.config();

export const formatVideoList = (listVideos) => {
    return listVideos.map((video) => ({
        ...video.toJSON(), // chuyển  dữ liệu từ Sequelize sang JSON
        thumbnail: `${process.env.BASE_URL}/public/images/${video.thumbnail}`,
        source: `${process.env.BASE_URL}/public/videos/${video.source}`
    }));
}