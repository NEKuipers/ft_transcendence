"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const matches_module_1 = require("./matches/matches.module");
const messages_module_1 = require("./messages/messages.module");
const participants_module_1 = require("./participants/participants.module");
const two_factor_auth_module_1 = require("./two_factor_auth/two_factor_auth.module");
const channels_module_1 = require("./channels/channels.module");
const user_achievements_module_1 = require("./user_achievements/user_achievements.module");
const achievements_module_1 = require("./achievements/achievements.module");
const blocked_users_module_1 = require("./blocked_users/blocked_users.module");
const avatars_module_1 = require("./avatars/avatars.module");
const friends_module_1 = require("./friends/friends.module");
const login_module_1 = require("./login/login.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                envFilePath: '../../.env',
            }), users_module_1.UsersModule, matches_module_1.MatchesModule, messages_module_1.MessagesModule, participants_module_1.ParticipantsModule, two_factor_auth_module_1.TwoFactorAuthModule, channels_module_1.ChannelsModule, user_achievements_module_1.UserAchievementsModule, achievements_module_1.AchievementsModule, blocked_users_module_1.BlockedUsersModule, avatars_module_1.AvatarsModule, friends_module_1.FriendsModule, login_module_1.LoginModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map