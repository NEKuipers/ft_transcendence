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
let UsersService = class UsersService {
    constructor() {
        this.users = [
            { id: 1, userName: "jevan-de", status: 0, oauth_refresh_token: "", oauth_token_expiration_timestamp: "2022-06-16 17:00:00", gamesPlayed: 8, gamesWon: 2, gamesLost: 6, isLoggedIn: true, leaderboardPosition: 6 },
            { id: 2, userName: "tmullan", status: 0, oauth_refresh_token: "", oauth_token_expiration_timestamp: "2022-06-16 17:00:00", gamesPlayed: 3, gamesWon: 2, gamesLost: 1, isLoggedIn: true, leaderboardPosition: 7 },
            { id: 3, userName: "nkuipers", status: 0, oauth_refresh_token: "", oauth_token_expiration_timestamp: "2022-06-16 17:00:00", gamesPlayed: 42, gamesWon: 41, gamesLost: 1, isLoggedIn: true, leaderboardPosition: 3 },
            { id: 4, userName: "jsimonis", status: 0, oauth_refresh_token: "", oauth_token_expiration_timestamp: "2022-06-16 17:00:00", gamesPlayed: 100, gamesWon: 50, gamesLost: 50, isLoggedIn: true, leaderboardPosition: 2 },
            { id: 5, userName: "a-user", status: 2, oauth_refresh_token: "", oauth_token_expiration_timestamp: "2022-06-16 17:00:00", gamesPlayed: 12, gamesWon: 3, gamesLost: 9, isLoggedIn: true, leaderboardPosition: 5 },
            { id: 6, userName: "guy-last", status: 2, oauth_refresh_token: "", oauth_token_expiration_timestamp: "2022-06-16 17:00:00", gamesPlayed: 65, gamesWon: 24, gamesLost: 41, isLoggedIn: false, leaderboardPosition: 4 },
            { id: 7, userName: "cwinner", status: 1, oauth_refresh_token: "", oauth_token_expiration_timestamp: "2022-06-16 17:00:00", gamesPlayed: 500, gamesWon: 500, gamesLost: 0, isLoggedIn: true, leaderboardPosition: 1 },
            { id: 8, userName: "mrpers", status: 0, oauth_refresh_token: "", oauth_token_expiration_timestamp: "2022-06-16 17:00:00", gamesPlayed: 4, gamesWon: 0, gamesLost: 4, isLoggedIn: false, leaderboardPosition: 8 }
        ];
    }
    findAll() {
        return this.users;
    }
    findOne(id) {
        return this.users.find(user => user.id == id);
    }
    findOneByName(username) {
        return this.users.find(user => user.userName == username);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map