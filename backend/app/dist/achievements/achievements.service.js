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
exports.AchievementsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let AchievementsService = class AchievementsService {
    constructor() { }
    async findAll() {
        let res = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/achievements`);
        return res.data;
    }
    async findUserAchievements(id) {
        const ret = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/user_achievements?user_id=eq.${id}`);
        return ret.data;
    }
};
AchievementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AchievementsService);
exports.AchievementsService = AchievementsService;
//# sourceMappingURL=achievements.service.js.map