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
            { id: 1, userName: "jevan-de", gamesPlayed: 8, gamesWon: 2, gamesLost: 6, isLoggedIn: true },
            { id: 2, userName: "tmullan", gamesPlayed: 3, gamesWon: 2, gamesLost: 1, isLoggedIn: true },
            { id: 3, userName: "nkuipers", gamesPlayed: 42, gamesWon: 41, gamesLost: 1, isLoggedIn: true },
            { id: 4, userName: "jsimonis", gamesPlayed: 100, gamesWon: 50, gamesLost: 50, isLoggedIn: true },
            { id: 5, userName: "a-user", gamesPlayed: 12, gamesWon: 3, gamesLost: 9, isLoggedIn: true },
            { id: 6, userName: "guy-last", gamesPlayed: 65, gamesWon: 24, gamesLost: 41, isLoggedIn: false },
            { id: 7, userName: "cwinner", gamesPlayed: 500, gamesWon: 500, gamesLost: 0, isLoggedIn: true },
            { id: 8, userName: "mrpers", gamesPlayed: 4, gamesWon: 0, gamesLost: 4, isLoggedIn: false }
        ];
    }
    findAll() {
        return this.users;
    }
    findOne(id) {
        return this.users.find(user => user.id == id);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map