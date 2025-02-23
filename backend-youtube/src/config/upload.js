import multer, {diskStorage} from "multer";

// define nơi lưu hình trong source BE
// =>/public/images
// process.cwd() => tìm đường dẫn tuyệt đối tới source BE
export const upload = multer({
    storage: diskStorage({
        destination: process.cwd() + "/public/images",
        filename: (req, file, callback) => {
            let newName = new Date().getTime() + "_" + file.originalname;
            callback(null, newName);
        }
    })
})