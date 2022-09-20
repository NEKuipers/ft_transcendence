"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsModule = void 0;
const common_1 = require("@nestjs/common");
const friends_service_1 = require("./friends.service");
const friends_controller_1 = require("./friends.controller");
const two_factor_auth_service_1 = require("../two_factor_auth/two_factor_auth.service");
let FriendsModule = class FriendsModule {
};
FriendsModule = __decorate([
    (0, common_1.Module)({
        providers: [friends_service_1.FriendsService, two_factor_auth_service_1.TwoFactorAuthService],
        controllers: [friends_controller_1.FriendsController]
    })
], FriendsModule);
exports.FriendsModule = FriendsModule;
//# sourceMappingURL=friends.module.js.map