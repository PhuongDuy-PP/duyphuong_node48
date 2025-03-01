// flow code
// code trong controller trước
// import connect from "../../db.js";
import initModels from "../models/init-models.js";
import connect from "../models/connect.js";
import { formatVideoList } from "../utils/formatData.js";
import {PrismaClient} from '@prisma/client';

// để connect tới datadabe
// thì phải tạo kết nối tới database thông qua initModels
// connect: địa chỉ kết nối tới database
const models = initModels(connect);
const prisma = new PrismaClient();

// --------------- controller video
// CREATE
const createVideo = async (req, res) => {
   try {
      // Sử dụng với mysql2
      // const queryString = `
      //       INSERT INTO videos(video_name, thumbnail, description) VALUES
      //       (?, ?, ?)
      //   `;
      // // lấy body từ request
      // let body = req.body;
      // let { video_name, thumbnail, description } = body;

      // // thực thi execute
      // const [data] = await connect.execute(queryString, [video_name, thumbnail, description]);
      // return res.send(data);

      // Sử dụng với sequelize
      //    {
      //       "video_name": "SƠN TÙNG M-TP | ĐỪNG LÀM TRÁI TIM ANH ĐAU | OFFICIAL TEASER",
      //       "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      //       "thumbnail": "https://img.youtube.com/vi/CQXQKr_3vKE/maxresdefault.jpg",
      //       "views": 1500,
      //       "source": "https://www.youtube.com/watch?v=CQXQKr_3vKE",
      //       "type_id": 1,
      //       "user_id": 1
      //   }
      const { video_name, description, thumbnail, views, source, type_id, user_id } = req.body;

      console.log("dữ liệu nhận ở body create video", { video_name, description, thumbnail, views, source, type_id, user_id });

      const video = await models.videos.create({ video_name, description, thumbnail, views, source, type_id, user_id });

      console.log("video mới là:", video.toJSON());

      res.status(200).json(video);
   } catch (error) {
      res.send(`Error: ${error}`);
   }
};

// controller list video
// READ
const listVideo = async (req, res) => {
   try {
      // const listVideos = await models.videos.findAll();
      const listVideos = await prisma.videos.findMany();

      // format dữ liệu listVideos
      const listVideosFormatted = formatVideoList(listVideos);

      // 2xx: trả dữ liệu thành công
      // VD: 200: OK
      // 201: Created
      return res.status(200).json(listVideosFormatted);
      // return res.status(200).json(listVideos)
   } catch (error) {
      console.log(error);
      // 5xx: lỗi của hệ thống
      // VD: 500, 501, 502,....
      return res.status(500).json({ message: "Error API list video" });
   }
};

// UPDATE
const updateVideo = async (req, res) => {
   try {
      // update video nào: video id
      const { longdeptraiId } = req.params;
      console.log({ longdeptraiId });

      // update cái gì: dữ liệu update video
      const { video_name } = req.body;
      console.log({ video_name });

      const result = await models.videos.update(
         {
            video_name: video_name,
         },
         {
            where: {
               video_id: longdeptraiId,
            },
         }
      );
      console.log("dữ liệu sau khi update", { result });

      res.status(200).json(`Update video id ${longdeptraiId} thành công`);
   } catch (error) {
      console.log(error);
      res.status(500).json(`Error ${error}`);
   }
};

// DELETE
const deleteVideo = async (req, res) => {
   try {
      const { videoId } = req.params;

      const result = await models.videos.destroy({
         where: {
            video_id: videoId,
         },
      });
      console.log("dữ liệu sau khi delete", { result });

      res.status(200).json(`Delete video id ${videoId}`);
   } catch (error) {
      console.log(error);
      res.status(500).json(`Error ${error}`);
   }
};

// --------------- controller video-type
// CREATE
const createVideoType = async (req, res) => {
   try {
      const { type_name } = req.body;
      console.log("Dữ liệu ở body - type_name::", type_name);

      // const result = await models.video_types.create({
      //    type_name: type_name,
      // });
      const result = await prisma.video_types.create({
         data: {
            type_name: type_name,
         }
      })
      // console.log("Kết quả tạo video type", result.toJSON());

      res.status(200).json(result);
   } catch (error) {
      console.log(`Error ${error}`);
      res.status(500).json(error);
   }
};

// READ
// controller getVideoTypes
const getVideoTypes = async (req, res) => {
   try {
      const listVideoTypes = await models.video_types.findAll();
      return res.status(200).json(listVideoTypes);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error API get video types" });
   }
};

export { deleteVideo, updateVideo, createVideoType, createVideo, listVideo, getVideoTypes };
