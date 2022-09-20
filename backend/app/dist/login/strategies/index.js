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
exports.intraStrategy = void 0;
const passport_42_1 = require("passport-42");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const login_service_1 = require("../login.service");
let intraStrategy = class intraStrategy extends (0, passport_1.PassportStrategy)(passport_42_1.Strategy) {
    constructor(loginService) {
        super({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            profileFields: {
                'id': function (obj) {
                    return String(obj.id);
                },
                username: 'login'
            }
        });
        this.loginService = loginService;
    }
    async validate(accessToken, refreshToken, userProfile, callback) {
        const { id, username } = userProfile;
        const details = { intraId: id, username };
        const user = await this.loginService.validateUser({
            intraId: userProfile.id,
            username: userProfile.username,
            oauth_refresh_token: refreshToken,
            oauth_token_expiration_time: '2020-07-20 11:44:34'
        });
        callback(null, user);
    }
};
intraStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], intraStrategy);
exports.intraStrategy = intraStrategy;
//# sourceMappingURL=index.js.map