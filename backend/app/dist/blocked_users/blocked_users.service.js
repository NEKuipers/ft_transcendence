"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockedUsersService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let BlockedUsersService = class BlockedUsersService {
    findAllForUser(id) {
        return new Promise((accept, reject) => {
            axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/vw_blocked_users?user_id=eq.${id}`)
                .then((response) => {
                if (response.status != 200) {
                    console.log(`Got statusCode: ${response.status} (${response.statusText}): ${JSON.stringify(response.headers, null, 4)}`);
                    reject(response);
                    return;
                }
                accept(response.data);
            }).catch((error) => {
                console.log(`Got error: ${error}`);
                reject(error);
            });
        });
    }
    async haveYouBlockedUser(your_id, other_id) {
        let res = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/blocked_users?blocked_by_id=eq.${your_id}&blocked_user_id=eq.${other_id}`);
        return (res.data.length > 0);
    }
    async hasUserBlockedMe(your_id, other_id) {
        let res = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/blocked_users?blocked_user_id=eq.${your_id}&blocked_by_id=eq.${other_id}`);
        return (res.data.length > 0);
    }
    async getAllWhoBlockedMe(id) {
        let res = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/blocked_users?blocked_user_id=eq.${id}`);
        let ids = [];
        let blockers = res.data;
        for (let x = 0; x < blockers.length; x++) {
            ids.push(blockers[x].blocked_by_id);
        }
        return ids;
    }
    async getAllWhoIHaveBlocked(id) {
        let res = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/vw_blocked_users?user_id=eq.${id}`);
        let ids = [];
        let blocked_users = res.data;
        for (let x = 0; x < blocked_users.length; x++) {
            ids.push(blocked_users[x].blocked_user_id);
        }
        return ids;
    }
    blockUser(from_id, other_id) {
        axios_1.default.post(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/blocked_users`, {
            "blocked_by_id": from_id,
            "blocked_user_id": other_id
        })
            .then(res => res)
            .catch(err => console.log(err));
        return "success";
    }
    unblockUser(from_id, other_id) {
        axios_1.default.delete(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/blocked_users?blocked_by_id=eq.${from_id}&blocked_user_id=eq.${other_id}`)
            .then(res => res)
            .catch(err => console.log(err));
        return "success";
    }
};
BlockedUsersService = __decorate([
    (0, common_1.Injectable)()
], BlockedUsersService);
exports.BlockedUsersService = BlockedUsersService;
//# sourceMappingURL=blocked_users.service.js.map