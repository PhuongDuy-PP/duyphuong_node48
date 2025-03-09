"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideosService = void 0;
const common_1 = require("@nestjs/common");
let VideosService = class VideosService {
    create(createVideoDto) {
        return 'This action adds a new video';
    }
    findAll() {
        return `This action returns all videos`;
    }
    findOne(id) {
        return `This action returns a ${id} video`;
    }
    update(id, updateVideoDto) {
        return `This action updates a #${id} video`;
    }
    remove(id) {
        return `This action removes a #${id} video`;
    }
};
exports.VideosService = VideosService;
exports.VideosService = VideosService = __decorate([
    (0, common_1.Injectable)()
], VideosService);
//# sourceMappingURL=videos.service.js.map