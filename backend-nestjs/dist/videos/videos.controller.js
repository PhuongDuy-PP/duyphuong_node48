"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosController = void 0;
const common_1 = require("@nestjs/common");
const videos_service_1 = require("./videos.service");
const create_video_dto_1 = require("./dto/create-video.dto");
const update_video_dto_1 = require("./dto/update-video.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("../shared/upload.service");
const file_upload_dto_1 = require("./dto/file-upload.dto");
const file_multiple_upload_dto_1 = require("./dto/file-multiple-upload.dto");
const passport_1 = require("@nestjs/passport");
let VideosController = class VideosController {
    videosService;
    constructor(videosService) {
        this.videosService = videosService;
    }
    async create(createVideoDto) {
        return await this.videosService.create(createVideoDto);
    }
    async findAll(res, page, size, videoName) {
        try {
            const formatPage = page ? Number(page) : 1;
            const formatSize = size ? Number(size) : 10;
            let videos = await this.videosService.findAll(formatPage, formatSize, videoName);
            return res.status(common_1.HttpStatus.OK).json({ videos });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
    findOne(id) {
        return this.videosService.findOne(+id);
    }
    update(id, updateVideoDto) {
        return this.videosService.update(+id, updateVideoDto);
    }
    remove(id) {
        return this.videosService.remove(+id);
    }
    getParams(req, id, name, token, body, res) {
        console.log(req.params);
        const idExpress = req.params.id;
        return res.status(200).json({ id, idExpress, name, token, body });
    }
    uploadThumnail(file, res) {
        return res.status(common_1.HttpStatus.OK).json(file);
    }
    uploadMultipleThumbnail(files, res) {
        return res.status(common_1.HttpStatus.OK).json(files);
    }
};
exports.VideosController = VideosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_video_dto_1.CreateVideoDto]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/get-all"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "size", required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: "video_name", required: false, type: String }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)("page")),
    __param(2, (0, common_1.Query)("size")),
    __param(3, (0, common_1.Query)("video_name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String]),
    __metadata("design:returntype", Promise)
], VideosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_video_dto_1.UpdateVideoDto]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)("/get-params/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)('name')),
    __param(3, (0, common_1.Headers)('token')),
    __param(4, (0, common_1.Body)()),
    __param(5, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Object, Object]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "getParams", null);
__decorate([
    (0, common_1.Post)("/upload-thumbnail"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({ type: file_upload_dto_1.FileUploadDto, required: true }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("thumbnail", { storage: (0, upload_service_1.storage)("thumbnail") })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], VideosController.prototype, "uploadThumnail", null);
__decorate([
    (0, common_1.Post)("/upload-multiple-thumbnail"),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({ type: file_multiple_upload_dto_1.FilesUploadDto, required: true }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)("thumbnails", 20, { storage: (0, upload_service_1.storage)("thumbnail") })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], VideosController.prototype, "uploadMultipleThumbnail", null);
exports.VideosController = VideosController = __decorate([
    (0, common_1.Controller)('videos'),
    __metadata("design:paramtypes", [videos_service_1.VideosService])
], VideosController);
//# sourceMappingURL=videos.controller.js.map