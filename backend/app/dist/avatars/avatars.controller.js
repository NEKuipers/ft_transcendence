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
exports.AvatarsController = void 0;
const common_1 = require("@nestjs/common");
const avatars_service_1 = require("./avatars.service");
const platform_express_1 = require("@nestjs/platform-express");
const tfa_guard_1 = require("../two_factor_auth/tfa.guard");
let AvatarsController = class AvatarsController {
    constructor(avatarsService) {
        this.avatarsService = avatarsService;
    }
    async findOne(id, res) {
        const { data, headers } = await this.avatarsService.findOne(id);
        res.writeHead(200, {
            'Content-Type': headers['content-type'],
            'Content-Disposition': headers['content-disposition'],
            'Content-Length': data.length
        });
        return res.end(Buffer.from(data, 'binary'));
    }
    async newAvatar(res, req, image, file) {
        const uploadSuccessful = await this.avatarsService.uploadAvatar(file);
        res.send({ avatar_id: uploadSuccessful });
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AvatarsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(tfa_guard_1.TFAGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AvatarsController.prototype, "newAvatar", null);
AvatarsController = __decorate([
    (0, common_1.Controller)('avatars'),
    __metadata("design:paramtypes", [avatars_service_1.AvatarsService])
], AvatarsController);
exports.AvatarsController = AvatarsController;
//# sourceMappingURL=avatars.controller.js.map