"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockedUsersModule = void 0;
const common_1 = require("@nestjs/common");
const blocked_users_service_1 = require("./blocked_users.service");
const blocked_users_controller_1 = require("./blocked_users.controller");
const two_factor_auth_service_1 = require("../two_factor_auth/two_factor_auth.service");
let BlockedUsersModule = class BlockedUsersModule {
};
BlockedUsersModule = __decorate([
    (0, common_1.Module)({
        providers: [blocked_users_service_1.BlockedUsersService, two_factor_auth_service_1.TwoFactorAuthService],
        controllers: [blocked_users_controller_1.BlockedUsersController]
    })
], BlockedUsersModule);
exports.BlockedUsersModule = BlockedUsersModule;
//# sourceMappingURL=blocked_users.module.js.map