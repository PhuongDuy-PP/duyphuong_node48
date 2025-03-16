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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVideoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateVideoDto {
    video_name;
    thumbnail;
    description;
    views;
    source;
    user_id;
}
exports.CreateVideoDto = CreateVideoDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Video name không được để trống" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "video_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Thumbnail không được để trống" }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "thumbnail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateVideoDto.prototype, "views", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateVideoDto.prototype, "source", void 0);
//# sourceMappingURL=create-video.dto.js.map