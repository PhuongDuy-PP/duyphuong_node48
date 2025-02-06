// flow code
// code trong controller trước
// import connect from "../../db.js";
import initModels from "../models/init-models.js";
import connect from "../models/connect.js";
import { formatVideoList } from "../utils/formatData.js";

// để connect tới datadabe
// thì phải tạo kết nối tới database thông qua initModels
// connect: địa chỉ kết nối tới database
const models = initModels(connect);

const createVideo = async (req, res) => {
    try {
        const queryString =`
            INSERT INTO videos(video_name, thumbnail, description) VALUES
            (?, ?, ?)
        `
        // lấy body từ request
        let body = req.body;
        let {video_name, thumbnail, description} = body;

        // thực thi execute
        const [data] = await connect.execute(queryString, [video_name, thumbnail, description]);
        return res.send(data);
    } catch (error) {
        res.send(`Error: ${error}`);
    }
}

// controller list video
const listVideo = async (req, res) => {
    try {
        const listVideos = await models.videos.findAll();

        // format dữ liệu listVideos
        const listVideosFormatted = formatVideoList(listVideos);

        // 2xx: trả dữ liệu thành công
        // VD: 200: OK
        // 201: Created
        return res.status(200).json(listVideosFormatted);
    } catch (error) {
        console.log(error);
        // 5xx: lỗi của hệ thống
        // VD: 500, 501, 502,....
        return res.status(500).json({message: "Error API list video"});
    }
}

// controller getVideoTypes
const getVideoTypes = async(req, res) => {
    try {
        const listVideoTypes = await models.video_types.findAll();
        return res.status(200).json(listVideoTypes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error API get video types"});
    }
}

export {
    createVideo,
    listVideo,
    getVideoTypes
}