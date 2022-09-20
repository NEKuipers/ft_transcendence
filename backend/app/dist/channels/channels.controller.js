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
exports.ChannelsController = void 0;
const common_1 = require("@nestjs/common");
const channels_service_1 = require("./channels.service");
let ChannelsController = class ChannelsController {
    constructor(channelsService) {
        this.channelsService = channelsService;
    }
    async findAllForUser(id) {
        return await this.channelsService.findAllForUser(id);
    }
    async findAllNotForUser(id) {
        return await this.channelsService.findAllNotForUser(id);
    }
    async findById(id) {
        return this.channelsService.findOne(id);
    }
    async checkChannelName(newChannelName) {
        return this.channelsService.checkChannelName(newChannelName.name);
    }
};
__decorate([
    (0, common_1.Get)('/all_for_:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "findAllForUser", null);
__decorate([
    (0, common_1.Get)('/all_not_for_:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "findAllNotForUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)('/check_channel_name'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChannelsController.prototype, "checkChannelName", null);
ChannelsController = __decorate([
    (0, common_1.Controller)('channels'),
    __metadata("design:paramtypes", [channels_service_1.ChannelsService])
], ChannelsController);
exports.ChannelsController = ChannelsController;
//# sourceMappingURL=channels.controller.js.map