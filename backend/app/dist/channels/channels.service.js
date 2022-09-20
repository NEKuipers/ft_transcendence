"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let ChannelsService = class ChannelsService {
    async findAllNonDirect() {
        let res = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/channels?type=neq.direct&is_closed=eq.false`);
        return res.data;
    }
    async findAllForUser(user_id) {
        let res = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/participants?participant_id=eq.${user_id}&is_joined=eq.true`);
        let channels = [];
        for (let i = 0; i < res.data.length; i++) {
            let temp = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/channels?id=eq.${res.data[i].channel_id}&type=neq.direct&is_closed=eq.false`);
            if (temp.data[0]) {
                channels.push(temp.data[0]);
            }
        }
        return channels;
    }
    async findAllNotForUser(user_id) {
        let all = await this.findAllNonDirect();
        let joined = await this.findAllForUser(user_id);
        if (joined.length == 0) {
            return all;
        }
        let joined_ids = [];
        for (let x = 0; x < joined.length; x++) {
            joined_ids.push(joined[x].id);
        }
        let otherChannels = [];
        for (let x = 0; x < all.length; x++) {
            if (!joined_ids.includes(all[x].id)) {
                otherChannels.push(all[x]);
            }
        }
        return otherChannels;
    }
    async findOne(channel_id) {
        let res = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/channels?id=eq.${channel_id}`);
        return res.data;
    }
    async checkChannelName(newChannelName) {
        if (newChannelName.length > 22) {
            return "too-long";
        }
        let allOpenChannels = await this.findAllNonDirect();
        for (let x = 0; x < allOpenChannels.length; x++) {
            if (allOpenChannels[x].name == newChannelName) {
                return "taken";
            }
        }
        return "ok";
    }
};
ChannelsService = __decorate([
    (0, common_1.Injectable)()
], ChannelsService);
exports.ChannelsService = ChannelsService;
//# sourceMappingURL=channels.service.js.map