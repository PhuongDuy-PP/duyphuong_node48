import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// load environment variables
dotenv.config();

// define hàm tạo access token
const createAccessToken = (payload) => {
    return jwt.sign({payload}, process.env.SECRET_KEY, {
        algorithm: "HS256",
        expiresIn: "2h" // h: hour, m: minutes, s: seconds, d: days
    })
};

export {
    createAccessToken,
}