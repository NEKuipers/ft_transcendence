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
exports.FriendsController = void 0;
const common_1 = require("@nestjs/common");
const friends_service_1 = require("./friends.service");
const tfa_guard_1 = require("../two_factor_auth/tfa.guard");
let FriendsController = class FriendsController {
    constructor(friendsService) {
        this.friendsService = friendsService;
    }
    async findAllForUser(id) {
        return this.friendsService.findAllForUser(id);
    }
    async findAllRequestsForUser(id) {
        return this.friendsService.findAllRequestsForUser(id);
    }
    async isFriend(your_id, other_id) {
        return this.friendsService.isFriend(your_id, other_id);
    }
    async create(req, other_id) {
        return this.friendsService.createFriend(req.user.id, other_id.id);
    }
    async declineRequest(req, other_id) {
        return this.friendsService.declineRequest(req.user.id, other_id.id);
    }
    async acceptRequest(req, other_id) {
        return this.friendsService.acceptRequest(req.user.id, other_id.id);
    }
    async unfriend(req, other_id) {
        return this.friendsService.deleteFriend(req.user.id, other_id.id);
    }
};
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "findAllForUser", null);
__decorate([
    (0, common_1.Get)('/requests/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "findAllRequestsForUser", null);
__decorate([
    (0, common_1.Get)('is_friend/:your_id&:other_id'),
    __param(0, (0, common_1.Param)('your_id')),
    __param(1, (0, common_1.Param)('other_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "isFriend", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(tfa_guard_1.TFAGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('/decline'),
    (0, common_1.UseGuards)(tfa_guard_1.TFAGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "declineRequest", null);
__decorate([
    (0, common_1.Patch)('/accept'),
    (0, common_1.UseGuards)(tfa_guard_1.TFAGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "acceptRequest", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(tfa_guard_1.TFAGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "unfriend", null);
FriendsController = __decorate([
    (0, common_1.Controller)('friends'),
    __metadata("design:paramtypes", [friends_service_1.FriendsService])
], FriendsController);
exports.FriendsController = FriendsController;
//# sourceMappingURL=friends.controller.js.map