"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let AvatarsService = class AvatarsService {
    async findOne(id) {
        try {
            const response = await axios_1.default.post(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/rpc/fnc_get_avatar`, { id: id }, {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/octet-stream',
                },
            });
            return { data: response.data, headers: response.headers };
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return null;
            }
            else {
                console.log('unexpected error: ', error);
                return null;
            }
        }
    }
    async uploadAvatar(file) {
        const buff = file.buffer;
        const imgdata = "\\x" + buff.toString("hex");
        const response = await axios_1.default.post(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/avatars`, {
            img: imgdata,
            name: file.originalname,
            format: 'img/png'
        }, {
            headers: {
                'Prefer': "return=representation"
            }
        })
            .then(res => { return res.data[0].id; })
            .catch(err => { console.log(err); return 1; });
        return response;
    }
};
AvatarsService = __decorate([
    (0, common_1.Injectable)()
], AvatarsService);
exports.AvatarsService = AvatarsService;
//# sourceMappingURL=avatars.service.js.map