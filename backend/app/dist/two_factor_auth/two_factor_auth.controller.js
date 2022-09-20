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
exports.TwoFactorAuthController = void 0;
const common_1 = require("@nestjs/common");
const two_factor_auth_service_1 = require("./two_factor_auth.service");
const tfa_guard_1 = require("./tfa.guard");
const guards_1 = require("../login/guards");
let TwoFactorAuthController = class TwoFactorAuthController {
    constructor(twoFactorAuthService) {
        this.twoFactorAuthService = twoFactorAuthService;
    }
    get_key_uri(req, session) {
        let userId = req.user.id;
        return this.twoFactorAuthService.get_keyuri(userId, session);
    }
    async login(req, token, session) {
        let userId = req.user.id;
        let login_status = await this.twoFactorAuthService.login(userId, token, session);
        if (login_status) {
            return "Login success";
        }
        else {
            throw new common_1.HttpException("Invalid token", 401);
        }
    }
    only_when_logged_in() {
        return "You are logged in!";
    }
};
__decorate([
    (0, common_1.Get)('/keyuri'),
    (0, common_1.UseGuards)(guards_1.AuthenticatedGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TwoFactorAuthController.prototype, "get_key_uri", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.AuthenticatedGuard),
    (0, common_1.Get)('/login/:token'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('token')),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], TwoFactorAuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("test"),
    (0, common_1.UseGuards)(tfa_guard_1.TFAGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], TwoFactorAuthController.prototype, "only_when_logged_in", null);
TwoFactorAuthController = __decorate([
    (0, common_1.Controller)('two-factor-auth'),
    __metadata("design:paramtypes", [two_factor_auth_service_1.TwoFactorAuthService])
], TwoFactorAuthController);
exports.TwoFactorAuthController = TwoFactorAuthController;
//# sourceMappingURL=two_factor_auth.controller.js.map