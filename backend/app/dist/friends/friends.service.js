"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const moment = require("moment");
let FriendsService = class FriendsService {
    findAllForUser(id) {
        return new Promise((accept, reject) => {
            axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/vw_friends?user_id=eq.${id}&request_status=eq.accepted`)
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
    findAllRequestsForUser(id) {
        return new Promise((accept, reject) => {
            axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/vw_friend_requests?user_id=eq.${id}`)
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
    async isFriend(your_id, other_id) {
        const res = await axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/friends?from_user_id=eq.${your_id}&to_user_id=eq.${other_id}`);
        if (res.data.length == 0)
            return -1;
        if (res.data[res.data.length - 1].status == 'accepted')
            return 2;
        if (res.data[res.data.length - 1].status == 'send')
            return 0;
        return 1;
    }
    async createFriend(from_id, other_id) {
        axios_1.default.post(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/friends`, {
            from_user_id: from_id,
            to_user_id: other_id,
            status: "send"
        });
        return "Friend request added to database";
    }
    async acceptRequest(from_id, other_id) {
        axios_1.default.patch(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/friends?from_user_id=eq.${other_id}&to_user_id=eq.${from_id}`, {
            status: "accepted",
            response_time: moment().format('YYYY-MM-DD HH:mm:ss')
        })
            .then(res => res)
            .catch(err => console.log(err));
        axios_1.default.post(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/friends`, {
            from_user_id: from_id,
            to_user_id: other_id,
            status: "accepted",
            response_time: moment().format('YYYY-MM-DD HH:mm:ss')
        });
        return "Friend request updated";
    }
    async declineRequest(from_id, other_id) {
        axios_1.default.patch(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/friends?from_user_id=eq.${other_id}&to_user_id=eq.${from_id}`, {
            status: "declined",
            response_time: moment().format('YYYY-MM-DD HH:mm:ss')
        })
            .then(res => res)
            .catch(err => console.log(err));
        return "Friend request updated";
    }
    async deleteFriend(from_id, other_id) {
        axios_1.default.delete(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/friends?from_user_id=eq.${from_id}&to_user_id=eq.${other_id}`)
            .then(res => res)
            .catch(err => console.log(err));
        axios_1.default.delete(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/friends?from_user_id=eq.${other_id}&to_user_id=eq.${from_id}`)
            .then(res => res)
            .catch(err => console.log(err));
        return "success";
    }
};
FriendsService = __decorate([
    (0, common_1.Injectable)()
], FriendsService);
exports.FriendsService = FriendsService;
//# sourceMappingURL=friends.service.js.map