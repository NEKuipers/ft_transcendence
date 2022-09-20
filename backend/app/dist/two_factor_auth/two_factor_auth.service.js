"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorAuthService = void 0;
const common_1 = require("@nestjs/common");
const preset_default_1 = require("@otplib/preset-default");
const axios_1 = require("axios");
let TwoFactorAuthService = class TwoFactorAuthService {
    async get_secret(userId, session) {
        var _a;
        let ret = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/two_factor_auth?user_id=eq.${userId}`);
        let seed = (_a = ret.data[0]) === null || _a === void 0 ? void 0 : _a.seed;
        if (seed) {
            return [true, seed];
        }
        if (!session.tfa_token) {
            session.tfa_token = preset_default_1.authenticator.generateSecret();
            console.log("Generated session token: ", session.tfa_token);
        }
        return [false, session.tfa_token];
    }
    async is_tfa_setup(userId, session) {
        if (session.tfa_setup !== undefined) {
            return session.tfa_setup;
        }
        let ret = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/two_factor_auth?user_id=eq.${userId}`);
        let is_setup = ret.data[0] !== undefined;
        session.tfa_setup = is_setup;
        return is_setup;
    }
    async get_keyuri(userId, session) {
        var _a;
        let secret = await this.get_secret(userId, session);
        if (secret[0]) {
            throw new common_1.HttpException("2FA is already setup!", 403);
        }
        let ret = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/users?id=eq.${userId}`);
        let username = (_a = ret.data[0]) === null || _a === void 0 ? void 0 : _a.username;
        if (username === undefined) {
            throw new common_1.HttpException("Failed to fetch username from user id!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return preset_default_1.authenticator.keyuri(username, "ft_transcendence", secret[1]);
    }
    async login(userId, token, session) {
        if (session.tfa_authenticated) {
            return true;
        }
        let secret = await this.get_secret(userId, session);
        let success = preset_default_1.authenticator.verify({
            token: token,
            secret: secret[1]
        });
        if (success && secret[0] == false) {
            axios_1.default.post(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/two_factor_auth`, { "user_id": userId, "seed": secret[1] })
                .then((response) => {
                if (response.status != common_1.HttpStatus.CREATED) {
                    console.log(`Got statusCode: ${response.status} (${response.statusText}): ${JSON.stringify(response.headers, null, 4)}`);
                }
            })
                .catch((error) => {
                console.log(`Got error: ${error}`);
                console.log(`data ${JSON.stringify(error.response.data)}`);
            });
            delete session.tfa_token;
        }
        session.tfa_authenticated = success;
        session.tfa_setup = true;
        return success;
    }
    logout(session) {
        if (session.tfa_authenticated) {
            session.tfa_authenticated = false;
            return true;
        }
        return false;
    }
};
TwoFactorAuthService = __decorate([
    (0, common_1.Injectable)()
], TwoFactorAuthService);
exports.TwoFactorAuthService = TwoFactorAuthService;
//# sourceMappingURL=two_factor_auth.service.js.map