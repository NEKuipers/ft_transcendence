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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
let LoginService = class LoginService {
    constructor(userService) {
        this.userService = userService;
    }
    async validateUser(details) {
        let userDb = await this.userService.findOneIntra(details.intraId);
        if (userDb) {
            userDb.firstLogin = false;
            return userDb;
        }
        let newUserDb = await this.userService.createUser({
            username: details.username,
            status: 'online',
            avatar_id: 1,
            oauth_refresh_token: details.oauth_refresh_token,
            oauth_token_expiration_time: details.oauth_token_expiration_time,
            intra_id: details.intraId,
            is_logged_in: true
        });
        newUserDb.firstLogin = true;
        return newUserDb;
    }
};
LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map