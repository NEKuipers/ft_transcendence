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
exports.LoginController = void 0;
const common_1 = require("@nestjs/common");
const tfa_guard_1 = require("../two_factor_auth/tfa.guard");
const two_factor_auth_service_1 = require("../two_factor_auth/two_factor_auth.service");
const guards_1 = require("./guards");
const users_service_1 = require("../users/users.service");
const jwt = require("jsonwebtoken");
const axios_1 = require("axios");
let LoginController = class LoginController {
    constructor(twoFactorAuthService, usersService) {
        this.twoFactorAuthService = twoFactorAuthService;
        this.usersService = usersService;
    }
    OAuthRequest() {
        console.log('GET ON LOGIN');
        return 'Ye';
    }
    async callback(req, session, res) {
        console.log('GET ON CALLBACK');
        if (await this.twoFactorAuthService.is_tfa_setup(req.user.id, session)) {
            res.redirect(`${process.env.HOST_URL}/tfa`);
        }
        else {
            await axios_1.default.patch(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/users?id=eq.${req.user.id}`, { is_logged_in: true, status: 'online' });
            if (req.user.firstLogin) {
                res.redirect(`${process.env.HOST_URL}/setup-account`);
            }
            else {
                res.redirect(`${process.env.HOST_URL}/`);
            }
        }
    }
    async logout(req, session) {
        await axios_1.default.patch(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/users?id=eq.${req.user.id}`, { is_logged_in: false, status: 'offline' });
        return new Promise((resolve, reject) => {
            this.twoFactorAuthService.logout(session);
            req.logout((err) => {
                if (err) {
                    console.error("got err: ", err);
                    reject(err);
                }
                else {
                    resolve("Logout success!");
                }
            });
        });
    }
    async jwt(req) {
        return jwt.sign({
            userid: req.user.id,
            username: req.user.username,
        }, process.env.JSON_WEB_TOKEN_SECRET, {
            expiresIn: "10h",
        });
    }
    async whoami(req, session) {
        return {
            userID: req.user.id,
            userName: req.user.username,
            TFAEnabled: await this.twoFactorAuthService.is_tfa_setup(req.user.id, session)
        };
    }
    status() {
        return 'ok';
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(guards_1.IntraAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], LoginController.prototype, "OAuthRequest", null);
__decorate([
    (0, common_1.Get)('callback'),
    (0, common_1.UseGuards)(guards_1.IntraAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Session)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "callback", null);
__decorate([
    (0, common_1.Get)('/logout'),
    (0, common_1.UseGuards)(guards_1.AuthenticatedGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('/jwt'),
    (0, common_1.UseGuards)(tfa_guard_1.TFAGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "jwt", null);
__decorate([
    (0, common_1.Get)('/whoami'),
    (0, common_1.UseGuards)(tfa_guard_1.TFAGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "whoami", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, common_1.UseGuards)(tfa_guard_1.TFAGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "status", null);
LoginController = __decorate([
    (0, common_1.Controller)('login'),
    __metadata("design:paramtypes", [two_factor_auth_service_1.TwoFactorAuthService, users_service_1.UsersService])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map