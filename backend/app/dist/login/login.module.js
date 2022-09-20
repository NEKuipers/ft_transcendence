"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModule = void 0;
const common_1 = require("@nestjs/common");
const login_controller_1 = require("./login.controller");
const login_service_1 = require("./login.service");
const strategies_1 = require("./strategies");
const users_module_1 = require("../users/users.module");
const users_service_1 = require("../users/users.service");
const config_1 = require("@nestjs/config");
const Serialiser_1 = require("./utils/Serialiser");
const two_factor_auth_service_1 = require("../two_factor_auth/two_factor_auth.service");
let LoginModule = class LoginModule {
};
LoginModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule],
        controllers: [login_controller_1.LoginController],
        providers: [login_service_1.LoginService, Serialiser_1.SessionSerialiser, strategies_1.intraStrategy, users_service_1.UsersService, config_1.ConfigService, two_factor_auth_service_1.TwoFactorAuthService]
    })
], LoginModule);
exports.LoginModule = LoginModule;
//# sourceMappingURL=login.module.js.map