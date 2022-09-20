"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let UsersService = class UsersService {
    async findAll() {
        let res = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/users`);
        return res.data;
    }
    async findOne(id) {
        let res = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/users?id=eq.${id}`);
        return res.data[0];
    }
    async findOneIntra(intra_id) {
        let res = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/users?intra_id=eq.${intra_id}`);
        return res.data[0];
    }
    async findOneByName(userName) {
        let res = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/users?username=eq.${userName}`);
        return res.data[0];
    }
    async createUser(CreateUserDto) {
        await axios_1.default.post(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/users`, {
            username: CreateUserDto.username,
            status: CreateUserDto.status,
            avatar_id: CreateUserDto.avatar_id,
            intra_id: CreateUserDto.intra_id,
            oauth_refresh_token: CreateUserDto.oauth_refresh_token,
            oauth_token_expiration_time: CreateUserDto.oauth_token_expiration_time,
            is_logged_in: CreateUserDto.is_logged_in
        }).then((res) => {
            res;
        }).catch((err) => {
            console.error(err);
        });
        return this.findOneByName(CreateUserDto.username);
    }
    async setOnline(id) {
        await axios_1.default.patch(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/users?id=eq.${id}`, { status: 'online' });
    }
    async setOffline(id) {
        await axios_1.default.patch(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/users?id=eq.${id}`, { status: 'offline' });
    }
    async changeUsername(id, newUsername) {
        if (newUsername.length > 14) {
            return "too-long";
        }
        let users = await this.findAll();
        if (users.find((user) => user.username == newUsername && user.id != id)) {
            return "taken";
        }
        await axios_1.default.patch(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/users?id=eq.${id}`, {
            username: newUsername
        });
        return "success";
    }
    async changeAvatar(id, newavatar) {
        await axios_1.default.patch(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/users?id=eq.${id}`, {
            avatar_id: newavatar
        });
        return "success";
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map