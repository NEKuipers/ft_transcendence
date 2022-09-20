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
exports.ParticipantsController = void 0;
const common_1 = require("@nestjs/common");
const participants_service_1 = require("./participants.service");
let ParticipantsController = class ParticipantsController {
    constructor(participantsService) {
        this.participantsService = participantsService;
    }
    async findAllParticipantsOfChannel(channel_id) {
        return this.participantsService.findAllParticipantsOfChannel(channel_id);
    }
};
__decorate([
    (0, common_1.Get)('/:channel_id'),
    __param(0, (0, common_1.Param)('channel_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ParticipantsController.prototype, "findAllParticipantsOfChannel", null);
ParticipantsController = __decorate([
    (0, common_1.Controller)('participants'),
    __metadata("design:paramtypes", [participants_service_1.ParticipantsService])
], ParticipantsController);
exports.ParticipantsController = ParticipantsController;
//# sourceMappingURL=participants.controller.js.map