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

// define hàm verify access token
const verifyAccessToken = (accessToken) => {
    try {
        jwt.verify(accessToken, process.env.SECRET_KEY);
        return true;
    } catch (error) {
        return false;
    }
}

// define middleware để check token
// next: chuyển tiếp request tới middleware tiếp theo hooặc controller
const middlewareToken = (req, res, next) => {
    let {token} = req.headers;
    console.log("token: ", token);
    // TH1: token không có trong header của request
    if(!token) {
        // mã lỗi 4xx: lỗi của user
        return res.status(401).json({message: "Unauthorized"});
    }

    let checkToken = verifyAccessToken(token);
    // TH2: token không hợp lệ
    if(!checkToken) {
        return res.status(401).json({message: "Unauthorized"});
    }

    // TH3: token hợp lệ
    next();
}

export {
    createAccessToken,
    verifyAccessToken,
    middlewareToken,
}