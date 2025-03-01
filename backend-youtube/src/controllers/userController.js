import connect from "../../db.js";
import {PrismaClient} from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
    try {
        const [data] = await connect.query(`
            SELECT * FROM users
        `)

        // response của query hay là excute là 1 list có 2 phần tử
        // phần tử 1: data
        // phần tử 2: metadata

        return res.send({data});
    } catch (error) {
        return res.send(`Error: ${error}`);
    }
}

// define controller create user
const createUser = async (req, res) => {
    try {
        const queryString = `
            INSERT INTO users(full_name, email, pass_word) VALUES
            (?, ?, ?)
        `;
        let body = req.body;
        let {full_name, email, pass_word} = body; // destructuring
        // thực thi query
        const [data] = await connect.execute(queryString, [full_name, email, pass_word])
        return res.send(data);
    } catch (error) {
        return res.send(`Error: ${error}`);
    }
}

const uploadAvatar = async (req, res) => {
    try {
        let file = req.file;
        return res.status(200).json(file);
    } catch (error) {
        console.log("uploadAvatar error", error);
        return res.status(500).json({message: "Error upload avatar"});
    }
}

const uploadMultipleImgs = async (req, res) => {
    try {
        let files = req.files;
        return res.status(200).json(files);
    } catch (error) {
        console.log("uploadMultipleImgs error", error);
        return res.status(500).json({message: "Error upload multiple images"});
    }
}

const uploadAvatarCloud = async (req, res) => {
    try {
        let file = req.file;
        return res.status(200).json(file);
    } catch (error) {
        console.log("uploadAvatarCloud error", error);
        return res.status(500).json({message: "Error upload avatar to cloudinary"});
    }
}

const getUserProfile = async (req, res) => {
    try {
        // B1: lấy userId từ request
        // userId này được middlewareToken gán vào request
        let userId = req.userId;

        // B2: tìm user trong database
        let user = await prisma.users.findFirst({
            where: {
                user_id: userId
            }
        })

        // B3: trả về thông tin user
        // update lại avatar của user
        // giả sử avatar lưu trong source code
        let response = user;
        if(user.avatar) {
            response = {
                ...user,
                avatar: `${process.env.BASE_URL}/public/images/${user.avatar}`
            }
        }
        return res.status(200).json(response);
    } catch (error) {
        console.log("getUserProfile error", error);
        return res.status(500).json({message: "Error get user profile"});
    }
}

// export
// nếu export 2 biến hoặc function trở lên
//  thì không dùng default
export {
    getUsers,
    createUser,
    uploadAvatar,
    uploadMultipleImgs,
    uploadAvatarCloud,
    getUserProfile
}