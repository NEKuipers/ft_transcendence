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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
let UsersService = class UsersService {
    constructor(httpService) {
        this.httpService = httpService;
        this.users = [];
    }
    async findAll() {
        const res = this.httpService.get('http://localhost:3000/users');
        await res.forEach(element => {
            this.users = element.data;
        });
        return this.users;
    }
    async findOne(id) {
        const ret = await this.httpService.get('http://localhost:3000/users', {
            params: {
                id: 'eq.' + id
            }
        });
        await ret.forEach(element => {
            this.user = element.data[0];
        });
        return this.user;
    }
    async findOneByName(userName) {
        const ret = await this.httpService.get('http://localhost:3000/users', {
            params: {
                username: 'eq.' + userName
            }
        });
        await ret.forEach(element => {
            this.user = element.data[0];
        });
        return this.user;
    }
    createUser(CreateUserDto) {
        this.httpService.post('');
        return 'User created fr';
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map