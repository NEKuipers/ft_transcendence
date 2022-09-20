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
exports.BlockedUsersController = void 0;
const common_1 = require("@nestjs/common");
const blocked_users_service_1 = require("./blocked_users.service");
const tfa_guard_1 = require("../two_factor_auth/tfa.guard");
let BlockedUsersController = class BlockedUsersController {
    constructor(blockedUsersService) {
        this.blockedUsersService = blockedUsersService;
    }
    findAllForUser(id) {
        return this.blockedUsersService.findAllForUser(id);
    }
    async haveYouBlockedUser(your_id, other_id) {
        return this.blockedUsersService.haveYouBlockedUser(your_id, other_id);
    }
    async hasUserBlockedMe(your_id, other_id) {
        return this.blockedUsersService.hasUserBlockedMe(your_id, other_id);
    }
    async getAllWhoBlockedMe(id) {
        return this.blockedUsersService.getAllWhoBlockedMe(id);
    }
    async getAllWhoIHaveBlocked(id) {
        return this.blockedUsersService.getAllWhoIHaveBlocked(id);
    }
    blockUser(req, other) {
        return this.blockedUsersService.blockUser(req.user.id, other.other_id);
    }
    unblockUser(req, other) {
        return this.blockedUsersService.unblockUser(req.user.id, other.other_id);
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlockedUsersController.prototype, "findAllForUser", null);
__decorate([
    (0, common_1.Get)('have_you_blocked_them/:your_id&:other_id'),
    __param(0, (0, common_1.Param)('your_id')),
    __param(1, (0, common_1.Param)('other_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BlockedUsersController.prototype, "haveYouBlockedUser", null);
__decorate([
    (0, common_1.Get)('have_they_blocked_you/:your_id&:other_id'),
    __param(0, (0, common_1.Param)('your_id')),
    __param(1, (0, common_1.Param)('other_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BlockedUsersController.prototype, "hasUserBlockedMe", null);
__decorate([
    (0, common_1.Get)('all_who_blocked_me/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlockedUsersController.prototype, "getAllWhoBlockedMe", null);
__decorate([
    (0, common_1.Get)('all_who_i_have_blocked/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlockedUsersController.prototype, "getAllWhoIHaveBlocked", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(tfa_guard_1.TFAGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], BlockedUsersController.prototype, "blockUser", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(tfa_guard_1.TFAGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], BlockedUsersController.prototype, "unblockUser", null);
BlockedUsersController = __decorate([
    (0, common_1.Controller)('blocked_users'),
    __metadata("design:paramtypes", [blocked_users_service_1.BlockedUsersService])
], BlockedUsersController);
exports.BlockedUsersController = BlockedUsersController;
//# sourceMappingURL=blocked_users.controller.js.map