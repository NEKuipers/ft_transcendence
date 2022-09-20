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
exports.SessionSerialiser = void 0;
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../users/users.service");
let SessionSerialiser = class SessionSerialiser extends passport_1.PassportSerializer {
    constructor(userService) {
        super();
        this.userService = userService;
    }
    serializeUser(user, done) {
        done(null, { id: user.id });
    }
    async deserializeUser(user, done) {
        const userDB = await this.userService.findOne(user.id);
        return userDB ? done(null, userDB) : done(null, null);
    }
};
SessionSerialiser = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], SessionSerialiser);
exports.SessionSerialiser = SessionSerialiser;
//# sourceMappingURL=Serialiser.js.map