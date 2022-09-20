"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let ProfileService = class ProfileService {
    getAllProfiles() {
        return new Promise((accept, reject) => {
            axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/vw_profile`)
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
    getOneProfile(user_id) {
        return new Promise((accept, reject) => {
            axios_1.default.get(`http://${process.env.PGREST_HOST}:${process.env.PGREST_PORT}/vw_profile?user_id=eq.${user_id}`)
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
};
ProfileService = __decorate([
    (0, common_1.Injectable)()
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map