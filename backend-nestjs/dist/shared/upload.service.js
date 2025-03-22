"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const storage = (destination) => {
    return (0, multer_1.diskStorage)({
        destination: `./public/imgs/${destination}`,
        filename: (req, file, callback) => {
            const uniqueName = Date.now();
            callback(null, `${uniqueName}${(0, path_1.extname)(file.originalname)}`);
        }
    });
};
exports.storage = storage;
//# sourceMappingURL=upload.service.js.map